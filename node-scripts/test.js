const fetch = require('node-fetch');
const firebase = require('firebase');
const config = require('./config')
const db = firebase.initializeApp(config.firebaseConfig);

console.log("Why, Hello!");

const CITY = "Greensboro";
const STATE = "North Carolina";
const POI_NAME = "jackson library"
const API_KEY = config.GOOGLE_API_KEY;

let lat;
let lng;
let official_state;
let official_locality;
let official_poi_name;

let queryString = POI_NAME + " " + CITY + " " + STATE



let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" 
            + queryString +
          "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key="
            + API_KEY;

fetch(url)
.then(response=> response.json())
.then(json=> {
    getPlaceNameandCoordinates(json)
})

function getPlaceNameandCoordinates(json){
    lat = json.candidates[0].geometry.location.lat.toString()
    lng = json.candidates[0].geometry.location.lng.toString()
    official_poi_name = json.candidates[0].name

    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" 
            + lat + "," + lng +
          "&key="
            + API_KEY;

            fetch(url)
            .then(response=> response.json())
            .then(json=>  determineLocality(json))
}

function determineLocality(json){
  //console.log(json.results[0].address_components)
  const addressComponents = json.results[0].address_components
  let locality = '';
  let state = ''
  let foundLocality = false;
  let foundState = false
  
  addressComponents.forEach(component =>{
    
    if( foundLocality == false && component.types.includes("locality")){
      locality = component.long_name;
      foundLocality = true;
    }
    if(foundState ==  false && component.types.includes("administrative_area_level_1")){
      state = component.long_name;
      foundState = true;
    }
    
  })

  official_state = state;
  official_locality = locality;

  checkInfo();
}
function checkInfo(){
  console.log(official_state)
  console.log(official_locality)
  let statesMatch = STATE.toLowerCase() == official_state.toLowerCase();
  let citiesMatch =  CITY.toLowerCase() == official_locality.toLowerCase();
  if(statesMatch && citiesMatch)
    addPoiToDb();
  else{
    if(!statesMatch){
      console.log("States don't match: " + STATE + " => " + official_state)
    }
    if(!citiesMatch){
      console.log("Cities don't match : " + CITY + " => " + official_locality)
    }
  }
}

function addPoiToDb(){
  db.firestore().collection("states").doc(official_state).collection("cities").doc(official_locality).collection("pois").doc(official_poi_name)
  .set({lat: lat, lng: lng})
  .then(data=> console.log("success!"))
  .catch(err=> console.log(err))
}
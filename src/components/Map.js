import  React, { useState, useEffect} from 'react';
import db from '../db';
import {
  withScriptjs,
  withGoogleMap,
  //GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import InfoWindowWithComments from './comments/InfoWindowWithComments';
import { useParams } from 'react-router-dom';
import Markers from './Markers.js'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
/*
function Mapp(props){

*/




function Map(props){
  
  let { state, city } = useParams();
  const [location, setLocation] = useState({state: state, city: city})
  const [coordinates, setCoordinates] = useState(null)
  const [pois, setPois] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState({isSelected: false,
                                                        coordinates: null,
                                                        info: null})


  useEffect(()=>{
    fetch("https://maps.googleapis.com/maps/api/geocode/json?&address=" + city + "%20" + state + "&key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    .then(result => result.json())
    .then(json => {

      const latlng = extractCoordinates(json);
      const lat = latlng[0];
      const lng = latlng[1];
      setCoordinates({lat: lat, lng: lng});
      getAndSetPois();

    })
  },[])

  function getAndSetPois(){
    let pois=[];
    db.firestore().collection("states").doc(location.state).collection("cities").doc(location.city).collection("pois").get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        pois.push({id: doc.id,
                   name: doc.data().name,
                   type: doc.data().type,
                   address: doc.data().address,
                   photo: doc.data().photo,
                   lat: parseFloat(doc.data().lat),
                   lng: parseFloat(doc.data().lng)})
                   
        })
      setPois(pois);
    })
    
  }



  function extractCoordinates(jsonResponse){
     const location =  jsonResponse.results[0].geometry.location;
     const lat = location.lat;
     const lng = location.lng;
     return [lat, lng];

  }

  
  console.log(coordinates)
  return( coordinates && 
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyD4ENwzE6a-iclgUJ10bwegFfuUsUa69cE"
              >
              {console.log("map1")}
              <GoogleMap
                 id='example-map'
                 center={{lat: coordinates.lat, lng: coordinates.lng}}
                 zoom={10}
                 mapContainerStyle={{
                   width: '100%',
                   height: '100%'
                 }}
              > 
              {console.log("map2")}

               {pois && <Markers pois={pois} setSelectedMarker={setSelectedMarker} />}
                {(selectedMarker.isSelected === true) && <InfoWindowWithComments location={location} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} user={props.user} />}
                          

         
              </GoogleMap>
            </LoadScript>
  )         
}


  

    


export default Map;
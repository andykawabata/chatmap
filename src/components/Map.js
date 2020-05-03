import  React, { useState, useEffect} from 'react';
import db from '../db';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import InfoWindowWithComments from './InfoWindowWithComments.js';
import { useParams } from 'react-router-dom';
import Markers from './Markers.js'
/*
function Mapp(props){

*/

const mapConfig = {url:"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="+ process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  elem: <div style={{ height: `100%` }} />}



function Map(props){
  
  let { state, city } = useParams();
  const [location, setLocation] = useState({state: state, city: city})
  const [coordinates, setCoordinates] = useState(null)
  const [pois, setPois] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState({isSelected: false,
                                                        coordinates: null,
                                                        name: null,
                                                        comments: null})


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
        pois.push({name: doc.id,
                   type: 'type',
                   description: 'description',
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

  
  console.log("map")
  return( coordinates && <MyMap 
                            lat={coordinates.lat} 
                            lng={coordinates.lng} 
                            googleMapURL={mapConfig.url} 
                            loadingElement={mapConfig.elem} 
                            containerElement={mapConfig.elem} 
                            mapElement={mapConfig.elem} 
                          >

                            {pois && <Markers pois={pois} setSelectedMarker={setSelectedMarker} />}
                            {(selectedMarker.isSelected === true) && <InfoWindowWithComments location={location} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} user={props.user} />}
                          </MyMap>)

}


  
const MyMap = withScriptjs(withGoogleMap(props => 
  
  <GoogleMap 
    defaultZoom={15} 
    defaultCenter={{ lat: props.lat, lng: props.lng}}
  >
    
    {props.children}
  </GoogleMap>
))

    


export default Map;
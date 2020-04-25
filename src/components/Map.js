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
/*
function Mapp(props){

*/

const mapConfig = {url:"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="+ process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  elem: <div style={{ height: `100%` }} />}



function Map(){
  
  let { state, city } = useParams();
  const [location, setLocation] = useState({state: state, city: city})
  const [coordinates, setCoordinates] = useState(null)
  const [pois, setPois] = useState(null);


  useEffect(()=>{
    fetch("https://maps.googleapis.com/maps/api/geocode/json?&address=" + city + "%20" + state + "&key=AIzaSyD4ENwzE6a-iclgUJ10bwegFfuUsUa69cE")
    .then(result => result.json())
    .then(json => {

      const latlng = extractCoordinates(json);
      const lat = latlng[0];
      const lng = latlng[1];
      setCoordinates({lat: lat, lng: lng});
    })
  },[])

  function extractCoordinates(jsonResponse){
     const location =  jsonResponse.results[0].geometry.location;
     const lat = location.lat;
     const lng = location.lng;
     return [lat, lng];

  }

  return( coordinates && <MyMap lat={coordinates.lat} lng={coordinates.lng} googleMapURL={mapConfig.url} loadingElement={mapConfig.elem} containerElement={mapConfig.elem} mapElement={mapConfig.elem} >
      
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
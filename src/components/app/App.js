import  React, { useState, useEffect} from 'react';
import Navbar from '../Navbar.js'
import AppName from '../AppName.js'
import AuthItems from '../AuthItems.js'
import './App.css';
import db from '../../db';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

function App() {

  const mapConfig = {url:"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD4ENwzE6a-iclgUJ10bwegFfuUsUa69cE",
  elem: <div style={{ height: `100%` }} />}

  const Map = withScriptjs(withGoogleMap(props => 
    <GoogleMap 
      defaultZoom={15} 
      defaultCenter={{ lat: 36.0681, lng: -79.809546}}
    >{props.children}</GoogleMap>))


  return (
    <div className="App">
      <header>
        <Navbar>
         
          <AppName/>
          <AuthItems/>
          
        </Navbar>
      </header>
      <div className="opaque" style={{ width: "100vh", height: "100vh" }}>
       <Map googleMapURL={mapConfig.url} loadingElement={mapConfig.elem} containerElement={mapConfig.elem} mapElement={mapConfig.elem} >   
       </Map>  
     </div>
    </div>
  );
}




export default App;

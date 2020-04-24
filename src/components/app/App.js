import  React, { useState, useEffect} from 'react';
import Navbar from '../Navbar.js'
import AppName from '../AppName.js'
import AuthItems from '../AuthItems.js'
import LoginRegForm from '../LoginRegForm'
import CommentWindow from '../CommentWindow'
import './App.css';
import db from '../../db';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import InfoWindowWithComments from '../InfoWindowWithComments.js';


function App() {

  const [loginOpen, setLoginOpen] = useState(false);

  const mapConfig = {url:"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="+ process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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
          <AuthItems setLoginOpen={setLoginOpen}/>
        </Navbar>
      </header>
      <div className="map-wrapper" >
       <Map googleMapURL={mapConfig.url} loadingElement={mapConfig.elem} containerElement={mapConfig.elem} mapElement={mapConfig.elem} >   
        {/*<InfoWindowWithComments/>*/}
       </Map>  
     </div>
     <Modal open={loginOpen.isOpen} onClose={() => setLoginOpen(false)}>
       <LoginRegForm isLogin={loginOpen.isLogin}/>
     </Modal>

    </div>
  );
}




export default App;

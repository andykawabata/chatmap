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

  const [loginOpen, setLoginOpen] = useState({isOpen: false, isLogin: false});
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    db.auth().onAuthStateChanged(user => authStateHandler(user))
    
  },[]);

 



  const authStateHandler = (authUser) => {
    console.log(authUser)
    if(authUser == null){
      console.log("false")
      setUser(null);
      setLoadingUser(false)
    }
    else if(authUser.isAnonymous){
      console.log("one")
      setUser({uid: "Anonymous", username: "Anonymous"})
      setLoadingUser(false);
    }
    else if(authUser.displayName){//if authenticated by google, set username as display name
      console.log("two")
      setUser({uid: authUser.uid, username: authUser.displayName})
      setLoadingUser(false);
    }
    else{//make sure user name has been set in database! if not, log out
      console.log("three")
      getUserInfo(authUser.uid)
      .then(username => {setUser({uid: authUser.uid, username: username}); return username})
      .then((username) => { 
        console.log(username)
        if(username){
          console.log("SetUser: true")
          setLoadingUser(false);
        }
        else{
          setUser(null);
          console.log("SetUser: null1")
          setLoadingUser(false);
        }
      })
      
    }
    
    
      
  }



  const getUserInfo = (uid) => {
    return db.firestore().collection("users").doc(uid).get()
          .then(doc => {
            if(doc.exists)
              return doc.data().username;
            else
              return null;
          })
  }




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
          <AuthItems setLoginOpen={setLoginOpen} user={user} setUser={setUser} loadingUser={loadingUser}  />
        </Navbar>
      </header>
      <div className="map-wrapper" >
       <Map googleMapURL={mapConfig.url} loadingElement={mapConfig.elem} containerElement={mapConfig.elem} mapElement={mapConfig.elem} >   
        {/*<InfoWindowWithComments/>*/}
       </Map>  
     </div>
     <Modal open={loginOpen.isOpen} onClose={() => setLoginOpen({isOpen: false, isLogin: loginOpen.isLogin})}>
       <LoginRegForm isLogin={loginOpen.isLogin} setLoginOpen={setLoginOpen}/>
     </Modal>

    </div>
  );
}




export default App;

import  React, { useState, useEffect} from 'react';
import Map from '../Map'
import Navbar from '../Navbar.js'
import AppName from '../AppName.js'
import AuthItems from '../auth/AuthItems.js'
import LoginRegForm from '../auth/LoginRegForm'
import './App.css';
import db from '../../db';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

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
      setUser({uid: "Anonymous", username: "Anonymous", photo: "https://avatars2.githubusercontent.com/u/16786985?s=400&u=9f2fe771bbc8bcfcc195fde83ca914b00a98da54&v=4", email: "Anonymous"})
      setLoadingUser(false);
    }
    else if(authUser.displayName){//if authenticated by google, set username as display name
      console.log("two")
      setUser({uid: authUser.uid, username: authUser.displayName, photo: authUser.photoURL})
      setLoadingUser(false);
    }
    else{//make sure user name has been set in database! if not, log out
      console.log("three")
      getUserInfo(authUser.uid)
      .then(data => {setUser({uid: authUser.uid, username: data.username, photo: data.photo}); return data.username})
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
              return doc.data();
            else
              return null;
          })
  }

  return (
    <Router>
    
      <div className="App">
        <header>
          <Navbar>
            <AppName/>
            <AuthItems setLoginOpen={setLoginOpen} user={user} setUser={setUser} loadingUser={loadingUser}  />
          </Navbar>
        </header>
        <div className="map-wrapper" >
          <Router>
            <Route path={'/:state/:city'} 
                children={<Map user={user}/>}/>
          </Router>
        </div>
        <Modal open={loginOpen.isOpen} onClose={() => setLoginOpen({isOpen: false, isLogin: loginOpen.isLogin})}>
          <LoginRegForm isLogin={loginOpen.isLogin} setLoginOpen={setLoginOpen}/>
        </Modal>
      </div>
    </Router>
  );

}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  

  return (
    <div>
      <h3>ID:</h3>
    </div>
  );
}




export default App;

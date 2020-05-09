import React from 'react'
import * as firebase from 'firebase'
import db from '../../db'

export default function ThirdPartyAuthButtons(props){

    function authenticateWithGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        thirdPartyAuth(provider);
    }

    function authenticateWithFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        thirdPartyAuth(provider);
    }

    function authenticateAnonymous(){
        firebase.auth().signInAnonymously()
        .then(()=>{
            props.setLoginOpen({isLogin: props.fromLogin, isOpen: false})
        })
        .catch(function(error) { console.log(error)});
    }

    function thirdPartyAuth(provider){
        
        db.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var uid = result.user.uid
            var photo = result.user.photoURL
            var email = result.user.email
            addUserToDB(uid, photo, email);
            props.setLoginOpen({isLogin: props.fromLogin, isOpen: false})
        })
        .catch(error => alert(error))
        
    }

    const addUserToDB = (uid, photo, email) => {
        db.firestore().collection("users").doc(uid).set({
          username: "thirdpartyauth",
          photo: photo,
          email: email
        })
      }

    return(
        <div>
            <button class="btn btn-google btn-block text-uppercase" onClick={authenticateWithGoogle}>
                <i class="fab fa-google mr-2"></i> 
                Sign in with Google
            </button>
            <button class="btn btn-facebook btn-block text-uppercase" onClick={authenticateWithFacebook}>
                <i class="fab fa-facebook-f mr-2"></i> 
                Sign in with Facebook
            </button>
            <button class="btn btn-block btn-secondary text-uppercase" onClick={authenticateAnonymous}>
                <i class="fa fa-user-secret" aria-hidden="true"></i> 
                Sign in Anonymously
            </button>
        </div>
    )
}
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
        firebase.auth().signInAnonymously().catch(function(error) { console.log(error)});
    }

    function thirdPartyAuth(provider){
        
        
        db.auth().signInWithPopup(provider).then(function(result) {
           
            var token = result.credential.accessToken;
            var user = result.user;
            addUserToDB(user.uid);
        })
        .catch(error => alert(error))
        
    }

    const addUserToDB = (uid) => {
        db.firestore().collection("users").doc(uid).set({
          username: "thirdpartyauth"
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
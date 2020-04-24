import React,{ useState }from 'react'
import db from '../db'
import * as firebase from 'firebase';

export default function RegisterForm(props){

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [verify, setVerify] = useState(null);
    const[username, setUsername] = useState(null);

    function handleRegister(e){
        e.preventDefault();
        db.auth().createUserWithEmailAndPassword(email, password)
        .then(user=>{addUserToDB(user.user.uid)})
        .then(()=>props.setLoginOpen(false))
        .catch(error => console.log(error))

    }

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
          username: username
        })
      }

    return(
        <div class="card-body">
            <h2 class="card-title text-center">Register</h2>
            <form role="form" onSubmit={handleRegister}>
                <div class="form-group row">
                    <label for="inputEmailForm" class="sr-only control-label" >Username</label>
                    <div class="offset-sm-2 col-sm-8">
                        <input type="text" class="form-control" id="inputEmailForm" onChange={(e) => setUsername(e.target.value)} placeholder="username" required=""/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmailForm" class="sr-only control-label">Email</label>
                    <div class="offset-sm-2 col-sm-8">
                        <input type="text" class="form-control" id="inputEmailForm" onChange={(e)=> setEmail(e.target.value)} placeholder="email" required=""/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPasswordForm" class="sr-only control-label">Password</label>
                    <div class="offset-sm-2 col-sm-8">
                        <input type="text" class="form-control" id="inputPasswordForm" onChange={(e) => setPassword(e.target.value)} placeholder="password" required=""/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="input2Password2Form" class="sr-only control-label">verify</label>
                    <div class="offset-sm-2 col-sm-8">
                        <input type="text" class="form-control" id="input2Password2Form" onChange={(e) => setPassword(e.target.value)} placeholder="verify password" required=""/>
                    </div>
                </div>
            
                <div class="form-group row">
                    <div class="offset-sm-2 col-sm-8 pb-3 pt-2">
                    <button type="submit" class="btn btn-dark btn-block">Register</button>
                    </div>
                </div>
                <hr/>
                <button class="btn btn-google btn-block text-uppercase" type="submit" onClick={authenticateWithGoogle}><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                <button class="btn btn-facebook btn-block text-uppercase" type="submit" onClick={authenticateWithGoogle}><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                <button class="btn btn-block btn-secondary text-uppercase" type="submit" onClick={authenticateAnonymous}><i class="fa fa-user-secret" aria-hidden="true"></i> Sign in Anonymously</button>
            </form>
        </div>
    )

}
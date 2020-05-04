import React,{ useState }from 'react'
import db from '../../db'
import * as firebase from 'firebase';
import ThridPartyAuthButton from './ThirdPartyAuthButtons'
import ThirdPartyAuthButtons from './ThirdPartyAuthButtons';

export default function LoginForm(props){

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    

    function handleLogin(e){
    
        db.auth().signInWithEmailAndPassword(email, password)
            .then(()=>props.setLoginOpen({isOpen: false, isLogin:true}))
            .catch(function(error) {alert(error)});
    }

    const addUserToDB = (uid) => {
        db.firestore().collection("users").doc(uid).set({
          username: "thirdpartyauth"
        })
      }
 

    return(
        <div class="card-body">
            <h2 class="card-title text-center">Login</h2>
            <form role="form" onSubmit={handleLogin}>
                <div class="form-group row">
                    <label for="inputEmailForm" class="sr-only control-label">Email</label>
                    <div class="offset-sm-2 col-sm-8">
                        <input type="text" class="form-control" id="inputEmailForm" onChange={(e) => setEmail(e.target.value)} placeholder="email" required=""/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPasswordForm" class="sr-only control-label">Password</label>
                    <div class="offset-sm-2 col-sm-8">
                        <input type="text" class="form-control" id="inputPasswordForm" onChange={(e) => setPassword(e.target.value)} placeholder="password" required=""/>
                    </div>
                </div>
            
                <div class="form-group row">
                    <div class="offset-sm-2 col-sm-8 pb-3 pt-2">
                        <button type="submit" class="btn btn-dark btn-block">Sign-in</button>
                    </div>
                </div>
            </form>
                <hr/>
                
                    
                <ThirdPartyAuthButtons/>
            
                
        </div>
    )

}
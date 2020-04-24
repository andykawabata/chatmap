import React from 'react';
import UserHome from './UserHome'
import LoginSignup from './LoginSignup'

export default function AuthItems(props){

    if(props.loadingUser){
        return <div></div>
    }
    else{
        return props.user ? <UserHome user={props.user} setUser={props.setUser} /> : <LoginSignup setLoginOpen={props.setLoginOpen} />
    }
}


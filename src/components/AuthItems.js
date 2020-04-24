import React from 'react';
import UserHome from './UserHome'
import LoginSignup from './LoginSignup'

export default function AuthItems(props){

    return false ? <UserHome/> : <LoginSignup setLoginOpen ={props.setLoginOpen}/>
    
}


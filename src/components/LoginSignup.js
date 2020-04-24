import React from 'react';

export default function LoginSignup(props){

    return (
                <ul className="nav navbar-right">
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={()=>props.setLoginOpen({isOpen: true, isLogin: false})}>Sign Up<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={()=>props.setLoginOpen({isOpen: true, isLogin: true})}>Login</a>
                    </li>
                </ul>
           
    )
}
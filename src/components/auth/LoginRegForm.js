import React,{ useState }from 'react'
import db from '../../db'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import './bootstrap-social.css'


export default function LoginRegForm(props){


    console.log(props.isLogin)


    return (<div class="container pr-4 pl-4">
                        
               
                 <ul id="tabs" class="nav nav-pills nav-fill justify-content-around" data-tabs="tabs">
                    <li class="nav-item"><a class={ props.isLogin ? "nav-link active" : "nav-link"} href="#login" data-toggle="tab">Login</a></li>
                    <li class="nav-item"><a class={!props.isLogin ? "nav-link active" : "nav-link"}  href="#register" data-toggle="tab">Register</a></li>
                </ul>
               
                <div class="row" id="parent">
                    <div class="col d-block border-0 py-2">
                        <div class="card tab-content">



                            <div class={ props.isLogin ? "tab-pane active" : "tab-pane"} id="login">
                                <LoginForm setLoginOpen={props.setLoginOpen}/>
                            </div>



                            <div class={ !props.isLogin ? "tab-pane active" : "tab-pane"}  id="register">
                               <RegisterForm setLoginOpen={props.setLoginOpen}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
}
    
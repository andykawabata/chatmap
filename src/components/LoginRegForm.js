import React from 'react'
import './bootstrap-social.css'

export default function LoginRegForm(){

    return (<div class="container pr-4 pl-4">
                        
               
                 <ul id="tabs" class="nav nav-pills nav-fill justify-content-around" data-tabs="tabs">
                    <li class="nav-item"><a class="nav-link active" href="#login" data-toggle="tab">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="#register" data-toggle="tab">Register</a></li>
                </ul>
               
                <div class="row" id="parent">
                    <div class="col d-block border-0 py-2">
                        <div class="card tab-content">



                            <div class="tab-pane active"  id="login">
                                <div class="card-body">
                                    <h2 class="card-title text-center">Login</h2>
                                    <form role="form">
                                        <div class="form-group row">
                                            <label for="inputEmailForm" class="sr-only control-label">Email</label>
                                            <div class="offset-sm-2 col-sm-8">
                                                <input type="text" class="form-control" id="inputEmailForm" placeholder="email" required=""/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPasswordForm" class="sr-only control-label">Password</label>
                                            <div class="offset-sm-2 col-sm-8">
                                                <input type="text" class="form-control" id="inputPasswordForm" placeholder="password" required=""/>
                                            </div>
                                        </div>
                                    
                                        <div class="form-group row">
                                            <div class="offset-sm-2 col-sm-8 pb-3 pt-2">
                                                <button type="submit" class="btn btn-dark btn-block">Sign-in</button>
                                            </div>
                                        </div>

                                        <hr/>
                                        
                                          
                                        <button class="btn btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                                        <button class="btn btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                                        <button class="btn btn-block btn-secondary text-uppercase" type="submit"><i class="fa fa-user-secret" aria-hidden="true"></i> Sign in Anonymously</button>
                                    
                                       </form>
                                </div>
                            </div>



                            <div class="tab-pane "  id="register">
                                <div class="card-body">
                                    <h2 class="card-title text-center">Register</h2>
                                    <form role="form">
                                    <div class="form-group row">
                                            <label for="inputEmailForm" class="sr-only control-label">Username</label>
                                            <div class="offset-sm-2 col-sm-8">
                                                <input type="text" class="form-control" id="inputEmailForm" placeholder="username" required=""/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputEmailForm" class="sr-only control-label">Email</label>
                                            <div class="offset-sm-2 col-sm-8">
                                                <input type="text" class="form-control" id="inputEmailForm" placeholder="email" required=""/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPasswordForm" class="sr-only control-label">Password</label>
                                            <div class="offset-sm-2 col-sm-8">
                                                <input type="text" class="form-control" id="inputPasswordForm" placeholder="password" required=""/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="input2Password2Form" class="sr-only control-label">verify</label>
                                            <div class="offset-sm-2 col-sm-8">
                                                <input type="text" class="form-control" id="input2Password2Form" placeholder="verify password" required=""/>
                                            </div>
                                        </div>
                                    
                                        <div class="form-group row">
                                            <div class="offset-sm-2 col-sm-8 pb-3 pt-2">
                                            <button type="submit" class="btn btn-dark btn-block">Register</button>
                                            </div>
                                        </div>
                                        <hr/>
                                        <button class="btn btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                                        <button class="btn btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                                        <button class="btn btn-block btn-secondary text-uppercase" type="submit"><i class="fa fa-user-secret" aria-hidden="true"></i> Sign in Anonymously</button>
                                       </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
}
    
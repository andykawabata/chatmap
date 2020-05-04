import React from 'react';
import db from '../../db';

export default function UserHome(props){

    return (
        
            
                <ul className="nav navbar-right">
                    <li className="nav-item">
                    
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role ="button" data-toggle="dropdown">
                            <i class="fas fa-user"></i>
                            <span> {props.user.username}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        
                            <a className="dropdown-item" href="#" onClick={()=>{ db.auth().signOut(); props.setUser(null); }}>Sing Out</a>
                        </div>
                    </li>
                    
                </ul>
            
    
        )
    
}
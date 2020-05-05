import React from 'react';
import db from '../../db';

export default function UserHome(props){

    const style ={ppStyle: 
                        {height: '25px',
                        width: '25px',
                        position: 'relative',
                        overflow: 'hidden',
                        paddingBottom: '100%'},
                    
                    image: {position:'absolute'}}
    return (
        
            
                <ul className="nav navbar-right">
                    <li className="nav-item d-flex align-items-center">
                        <div style={style.ppStyle} className="border">
                            <img style={style.image} className="img img-responsive w-100" src={props.user.photo}/>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role ="button" data-toggle="dropdown">
                            <span> {props.user.username}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        
                            <a className="dropdown-item" href="#" onClick={()=>{ db.auth().signOut(); props.setUser(null); }}>Sing Out</a>
                        </div>
                    </li>
                    
                </ul>
            
    
        )
    
}
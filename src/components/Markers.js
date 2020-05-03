import  React, { useState, useEffect} from 'react';
import db from '../db';
import { Marker } from "react-google-maps";

export default function Markers(props){

    console.log("Markers")   
    function setMarker(poi){
        props.setSelectedMarker({isSelected: true,
            coordinates: {lat: poi.lat, lng: poi.lng},
             info: {name: poi.name, type: poi.type, description: poi.description}})

    }
    
    return(
        props.pois.map(poi => (

            <Marker key={poi.name} 
                    position={{lat: poi.lat, lng: poi.lng}} 
                    onClick={() =>setMarker(poi)}
                
                    
                    />
           
        
         
     )
    )
    )
}
import  React, { useState, useEffect} from 'react';
import db from '../db';
import { Marker } from "@react-google-maps/api";

export default function Markers(props){

    console.log("Markers")   
    function setMarker(poi){
        props.setSelectedMarker({isSelected: true,
                                coordinates: {lat: poi.lat, lng: poi.lng},
                                info: {poiID: poi.id,
                                       name: poi.name, 
                                       type: poi.type, 
                                       address: poi.address,
                                       photo: poi.photo}})

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
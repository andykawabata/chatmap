import React, {useEffect, useState} from 'react'
import {InfoWindow} from '@react-google-maps/api';
import CommentWindow from './CommentWindow';
import Comment from './Comment'


export default function InfoWindowWithComments(props){
  
    function handleClose(){
        props.setSelectedMarker({isSelected: false,
                                coordinates: null,
                                info: null})
    }
    const lat = props.selectedMarker.coordinates.lat;
    const lng = props.selectedMarker.coordinates.lng;
    
    return(
        <InfoWindow position={{ lat: lat, lng: lng}} options={{maxWidth: 'none'}} onCloseClick={handleClose}>
            <CommentWindow location = {props.location} poiInfo={props.selectedMarker.info} user={props.user} >
            </CommentWindow>
        </InfoWindow>
    )
}
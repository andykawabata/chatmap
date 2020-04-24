import React, {useEffect} from 'react'
import {InfoWindow} from 'react-google-maps';
import CommentWindow from './CommentWindow';
import Comment from './Comment'


export default function InfoWindowWithComments(){

    useEffect(()=>{
        
        
    },[])

    return(
        <InfoWindow position={{ lat: 36.0681, lng: -79.809546}} options={{maxWidth: 'none'}}>
            <CommentWindow>
                <Comment/>
            </CommentWindow>
        </InfoWindow>
    )

}
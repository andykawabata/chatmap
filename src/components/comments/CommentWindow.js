import React, { useState, useEffect } from 'react';
import "./CommentWindow.css";
import Comment from './Comment';
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import InfoPanel from './InfoPanel'
import db from '../../db';
import * as firebase from 'firebase';
import commentForm from './CommentForm';

export default function CommentWindow(props){

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getAndSetComments(); 
    },[])

    function getAndSetComments(){
        
        let currentComments = [];
        db.firestore().collection("states").doc(props.location.state).collection("cities").doc(props.location.city).collection("pois").doc(props.poiInfo.name).collection("comments").orderBy("created").get()
        .then(querySnapshot => {
            console.log(querySnapshot)
            querySnapshot.forEach(doc=>{
              currentComments.push({id: doc.id,
                                    text: doc.data().text,
                                    user: {username: doc.data().user.username, uid: doc.data().user.uid},
                                    timestamp: doc.data().created})
            })
           
            setComments(currentComments);
            setLoading(false);
        })
        .catch(err => setLoading(false))
    }

    function addCommentToPoiAndSet(text){// Add comment to STATE->CITY->POI in firestore, then set state in parent
        let comText = text;
        let state = props.location.state;
        let city = props.location.city;
        let user =props.user;
        let timestamp = firebase.firestore.Timestamp.now().seconds;

        db.firestore().collection("states").doc(state).collection("cities").doc(city)
        .collection("pois").doc(props.poiInfo.name).collection("comments")
        .add({text: comText, user: user, created: timestamp })
        .then(docRef => {
            getAndSetComments();
            addCommentToUser(text, docRef.id, timestamp);
        })
        .catch(err => console.log(err))
        
    }
    function addCommentToUser(comText, comID, comTimestamp){//Add comment to USERS in firestore
        let text = comText;
        let commentID = comID;
        let state = props.location.state;
        let city = props.location.city;
        let user =props.user;
        let timestamp = comTimestamp

        db.firestore().collection("users").doc(user.uid).collection("comments").doc(commentID)
        .set({text: text, location: {city: city, state: state}, created: timestamp})
        .then(docRef => {
            console.log("success")
        })
        .catch(err => console.log(err))
        



    }
    
    

    return( <div className="container my-container border rounded">
                <div className="row my-row border-bottom">
                    <div className="col-sm-3 order-sm-2 p-0 my-col">
                        <InfoPanel name={props.poiInfo.name} type={props.poiInfo.type } address={props.poiInfo.address} photo={props.poiInfo.photo}/>
                    </div>
                    <div className="col-sm-9 order-sm-1 my-col">
                        <div className="row p-2 bg-light border-bottom ">
                            <h5 className=" ">Recent Comments</h5>
                        </div>
                        <CommentList loading={loading} comments={comments}/>
                    </div>
                </div>
                <div className="row my-row pt-2">
                    <div className="col my-col">
                            <CommentForm addCommentToPoiAndSet={addCommentToPoiAndSet} user={props.user}/>
                    </div>
                </div>
            </div>)
}
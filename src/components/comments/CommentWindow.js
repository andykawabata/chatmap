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


    function deleteComment(commentID){
        db.firestore().collection("comments").doc(commentID).delete().then(function() {
            getAndSetComments();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    function getAndSetComments(){
        
        let currentComments = [];
        db.firestore().collection("comments").where("poiID", "==", props.poiInfo.poiID).orderBy("created").get()
        .then(querySnapshot => {
            console.log(querySnapshot)
            querySnapshot.forEach(doc=>{
              currentComments.push({id: doc.id,
                                    text: doc.data().text,
                                    user: {username: doc.data().username, uid: doc.data().uid, photo: doc.data().user_photo},
                                    timestamp: doc.data().created})
            })
           
            setComments(currentComments);
            setLoading(false);
        })
        .catch(err => {setLoading(false); console.log(err)})
    }

    function addCommentToDbAndSet(text){// Add comment to STATE->CITY->POI in firestore, then set state in parent
        let comText = text;
        let state = props.location.state;
        let city = props.location.city;
        let poiID = props.poiInfo.poiID;
        let uid = props.user.uid;
        let username = props.user.username;
        let userPhoto = props.user.photo;
        let timestamp = firebase.firestore.Timestamp.now().seconds;

        db.firestore().collection("comments")
        .add({text: comText, 
              uid: uid,
              username: username,
              user_photo: userPhoto,
              poiID: poiID,
              state: state,
              city: city,
              created: timestamp, })
        .then(docRef => {
            getAndSetComments();
        })
        .catch(err => console.log(err))
        
    }

    
    /*function addCommentToUser(comText, comID, comTimestamp){//Add comment to USERS in firestore
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
    }*/
    
    

    return( <div className="container my-container border rounded">
                <div className="row my-row border-bottom">
                    <div className="col-sm-3 order-sm-2 p-0 my-col">
                        <InfoPanel name={props.poiInfo.name} type={props.poiInfo.type } address={props.poiInfo.address} photo={props.poiInfo.photo}/>
                    </div>
                    <div className="col-sm-9 order-sm-1 my-col">
                        <div className="row p-2 bg-light border-bottom ">
                            <h5 className=" ">Recent Comments</h5>
                        </div>
                        <CommentList loading={loading} comments={comments} user={props.user} deleteComment={deleteComment}/>
                    </div>
                </div>
                <div className="row my-row pt-2">
                    <div className="col my-col">
                            <CommentForm addCommentToPoiAndSet={addCommentToDbAndSet} user={props.user}/>
                    </div>
                </div>
            </div>)
}
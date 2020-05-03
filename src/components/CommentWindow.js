import React, { useState, useEffect } from 'react';
import "./CommentWindow.css";
import Comment from './Comment';
import CommentForm from './CommentForm'
import db from '../db';
import * as firebase from 'firebase';
import commentForm from './CommentForm';

export default function CommentWindow(props){
    /* props: location city
                       state
              poiInfo  name
                       type
                       description
              user     uid
                       username


                       let comments = [];
    db.firestore().collection("states").doc(location.state).collection("cities").doc(location.city).collection("pois").doc(poi.name).collection("comments").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc=>{
          comments.push({id: doc.id,
                         text: doc.data().text,
                         username: doc.data().username,
                         uid: doc.data().uid,
                         timestamp: doc.data().date})
        })
*/
      

    console.log("commentWindow")
     

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
   
    

    useEffect(()=>{
        
        getAndSetComments();
    
    },[])

    function getAndSetComments(){
        
        
        let currentComments = [];
        db.firestore().collection("states").doc(props.location.state).collection("cities").doc(props.location.city).collection("pois").doc(props.poiInfo.name).collection("comments").orderBy("created").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=>{
              currentComments.push({id: doc.id,
                                    text: doc.data().text,
                                    user: {username: doc.data().username, uid: doc.data().uid},
                                    timestamp: doc.data().created})
            })
            setComments(currentComments);
            setLoading(false);
        })
        .catch(err => setLoading(false))
    }

    function handlePostComment(e){
        e.preventDefault();
        addCommentToPoiAndSet()
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
        



    }//text,commentID,location,poiName,timestamp
    
    

    return( <div className="container my-container border rounded">
                <div className="row my-row border-bottom">
                    <div className="col-sm-3 order-sm-2 p-0 my-col">
                        <div className="text-center w-100 bg-dark">
                            <img className="img img-responsive " src="http://getwallpapers.com/wallpaper/full/5/f/c/748462-amazing-pretty-pictures-for-backgrounds-1920x1200-1080p.jpg" className="img img-responsive full-width" />
                        </div>
                            <div className="m-2">
                            <h4>{props.poiInfo.name}</h4>
                            <p><i>{props.poiInfo.type }</i></p>
                            <p className="d-none d-sm-block">{props.poiInfo.description }</p>
                        </div>
                    </div>
                    <div className="col-sm-9 order-sm-1 my-col">
                        <div className="row p-2 bg-light border-bottom ">
                            <h5 className=" ">Recent Comments</h5>
                        </div>
                    
                        <div className="row">
                            <div className="comment-area" id="commentArea">
                            
                            {comments.length === 0 && !loading && 
                                <div className="h-100 d-flex justify-content-center align-items-center">
                                    <p>Be the first to comment!</p>
                                </div>
                            }


                            {comments &&
                                comments.map(comment => (
                                    <Comment comment={comment}/>
                                ))
                   
                            }



                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-row pt-2">
                    <div className="col my-col">
                            <CommentForm addCommentToPoiAndSet={addCommentToPoiAndSet}/>
                    </div>
                </div>
                
            </div>)
}
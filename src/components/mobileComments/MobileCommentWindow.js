import  React, { useState, useEffect} from 'react';
import db from '../../db';
import * as firebase from 'firebase';
import './MobileComments.css'
import InfoSection from './InfoSection'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default function MobileCommentWindow(props){
    /*
    selectedMarker
        isSelected
        coordinates
        info
            poiID
            name
            type
            address
            photo
    location
        city
        state
    user
        uid
        username
        photo
    */

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
       db.firestore().collection("comments").where("poiID", "==", props.selectedMarker.info.poiID).orderBy("created").get()
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
       let poiID = props.selectedMarker.info.poiID;
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
   

    return (
        <div className="flex-container">
            <InfoSection name={props.selectedMarker.info.name} address={props.selectedMarker.info.address} type={props.selectedMarker.info.type} photo={props.selectedMarker.info.photo}/>
            <CommentList loading={loading} comments={comments} user={props.user} deleteComment={deleteComment}/>
            <CommentForm addCommentToPoiAndSet={addCommentToDbAndSet} user={props.user}/>
        </div>
    )
}
import React from 'react'

export default function Comment(props){
    /*
    comment
        text
        id
        user
            uid, username, photo
        timestamp
    user
        username, uid, photo
    deleteComment
    */

function calculateElapsedTime(){
    let seconds = Date.now()/1000 - props.comment.timestamp;
    if(seconds/60 < 1)
        return Math.floor(seconds) +  ((seconds === 1) ? " Second Ago" : " Seconds Ago");
    let minutes = seconds/60;
    if(minutes/60 < 1)
        return Math.floor(minutes) + ((minutes === 1) ? " Minute Ago" :" Minutes Ago");
    let hours = minutes/60;
    if(hours/24 < 1)
        return Math.floor(hours) + ((hours === 1) ? " Hour Ago" :" Hours Ago");
    let days = hours/24;
    return Math.floor(days) + ((days === 1) ? " Day Ago" :" Days Ago");
}



const photo = props.comment.user.photo ? props.comment.user.photo : "https://image.ibb.co/jw55Ex/def_face.jpg"
const addDeleteButton = (props.user && props.comment.user.uid == props.user.uid  && props.user.uid !== "Anonymous") ? true : false 

    return(
        <div className="row comment">
                <div className="col-2 bg-light p-1 border-right">
                    <img className="user-photo" src={photo}/>
                </div>
                <div className="col-10 bg-light pl-2">
                    <div className="user-timestamp">
                        <p className="mb-1 mt-1">
                            <a className="float-left" href="#"><strong>{props.comment.user.username}</strong></a>
                            <span className="text-muted">&nbsp; {calculateElapsedTime()}</span>
                        </p>
                    </div>
                    <div className="comment-text">
                        {props.comment.text}
                    </div>
                    <div className="comment-footer">
                        <div className="footer-items">
                            {addDeleteButton && 
                            <a href="#" onClick={() => props.deleteComment(props.comment.id)} className="footer-item"> Delete</a>
                            }
                            <a href="#" className="footer-item">Reply</a>
                        </div>
                    </div>
                </div>
            </div>
    )
}
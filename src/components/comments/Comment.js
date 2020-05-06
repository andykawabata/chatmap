import React, {useEffect} from 'react'

export default function Comment(props){


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
        <React.Fragment>
        <div className="row">
            <div className="col-1 pr-0">
                <div>
                    <img src={photo} className="img img-rounded img-fluid"/>
                </div>
            </div>
            <div className="col-11 p">
                <p className="mb-2">
                    <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{props.comment.user.username}</strong></a>
                    <span className="text-muted">&nbsp; {calculateElapsedTime()}</span>
            </p>
            <div className="clearfix"></div>
                <p className="mb-1">{props.comment.text}</p>
                <div className="d-flex flex-row-reverse">
                    <a className=" btn btn-link btn-sml"> Reply</a>
                    { addDeleteButton && <a onClick={() => props.deleteComment(props.comment.id)}className="btn btn-link"> Delete</a>}
                </div>
            </div>
            
        </div>
        <hr style={{margin: '.4rem 0 .6rem 0'}}/>
        </React.Fragment>
        
    )
}
import React, {useEffect} from 'react'

export default function Comment(props){




    function calculateElapsedTime(){
        let seconds = Date.now()/1000 - props.comment.timestamp;
       
        
        console.log(seconds)
        if(seconds/60 < 1)
            return Math.floor(seconds) +  ((seconds < 2) ? " Second Ago" : "Seconds Ago");
        let minutes = seconds/60;
        if(minutes/60 < 1)
            return Math.floor(minutes) + ((minutes < 2) ? " Minute Ago" :" Minutes Ago");
        let hours = minutes/60;
        if(hours/24 < 1)
            return Math.floor(hours) + ((hours < 2) ? " Hour Ago" :" Hours Ago");
        let days = hours/24;
        return Math.floor(days) + ((days < 2) ? " Day Ago" :" Days Ago");
    }

    const imgContainerStyle = {
        
       
    }
  
    return(
        <React.Fragment>
        <div className="row">
            <div className="col-1 pr-0">
                <div style={imgContainerStyle}>
                    <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
                </div>
            </div>
            <div className="col-11 p">
                <p className="mb-2">
                    <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{props.comment.user.username}</strong></a>
                    <span className="text-muted">&nbsp; {props.comment.timestamp ? calculateElapsedTime() : "noTimesmp"}</span>
            </p>
            <div className="clearfix"></div>
                <p className="mb-1">{props.comment.text}</p>
                <p className="">
                    <a className="float-right  mr-2 "> Reply</a>
            </p>
            </div>
            
        </div>
        <hr style={{margin: '.4rem 0 .6rem 0'}}/>
        </React.Fragment>
        
    )
}
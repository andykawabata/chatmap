import React from 'react'

export default function CommentList(props){

    return(
        <div className="container comment-container flex-1">
            <div className="row comment">
                <div className="col-2 bg-light p-1 border-right">
                    <img className="user-photo" src="https://pngimage.net/wp-content/uploads/2018/05/default-profile-pic-png-8.png"/>
                </div>
                <div className="col-10 bg-light pl-2">
                    <div className="user-timestamp">
                        <p className="mb-1 mt-1">
                            <a className="float-left" href="#"><strong>Jimmy Rangoon</strong></a>
                            <span className="text-muted">&nbsp; 15 Minutes Ago</span>
                        </p>
                    </div>
                    <div className="comment-text">
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam
                    </div>
                    <div className="comment-footer">
                        <div className="footer-items">
                            <a href="#" className="footer-item">Delete</a>
                            <a href="#" className="footer-item">Reply</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
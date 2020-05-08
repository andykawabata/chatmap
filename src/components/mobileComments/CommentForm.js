import React from 'react'

export default function CommentList(props){

    return(
        <div className="comment-form">
            <form className="d-flex bg-dark">
                <div className="form-group m-1 flex-1">
                    <input className="form-control" type="text"/>
                </div>
                <div className="form-group m-1">
                    <button className="form-control flex-1" type="submit">Post</button>
                </div>
            </form>
        </div>
)
}
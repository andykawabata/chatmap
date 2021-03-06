import React from 'react'
import Comment from './Comment'

export default function CommentList(props){

    return(
        <div className="container comment-container flex-1">
            {props.comments.length === 0 && !props.loading && 
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <p>Be the first to comment!</p>
                </div>
            }

            {props.comments &&
                props.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} user={props.user} deleteComment={props.deleteComment} />
                ))

            }

        </div>
    )
}
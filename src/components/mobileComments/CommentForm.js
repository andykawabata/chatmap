import React, {useState} from 'react'

export default function CommentForm(props){

    const [text, setText] = useState(null);

    function onSubmit(e){
        e.preventDefault();
        if(props.user == null){
            alert("login")
        }
        else
            props.addCommentToPoiAndSet(text);
    }



    return(
        <div className="comment-form">
            <form className="d-flex bg-dark" onSubmit={onSubmit}>
                <div className="form-group m-1 flex-1">
                    <input className="form-control" type="text" onChange={(e)=>setText(e.target.value)} placeholder="Add a comment"/>
                </div>
                <div className="form-group m-1">
                    <button className="form-control flex-1" type="submit">Post</button>
                </div>
            </form>
        </div>
)
}
import React, {setState, useState} from 'react'

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


    return (

        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-10">
                    <div className="form-group">
                        <input type="comment" className="form-control" id="exampleInputEmail1" onChange={(e)=>setText(e.target.value)} aria-describedby="emailHelp" placeholder="Say Something About This Place.."/>                 
                    </div>
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-primary">Post</button>
                </div>
            </div>
        </form>
    )
}
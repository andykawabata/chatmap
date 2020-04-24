import React from 'react'

export default function Comment(){

    return(
        <div className="row">
            <div className="col-2">
                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
                
            </div>
            <div className="col-10">
                <p className="mb-2">
                    <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman Akash</strong></a>
                    <span className="text-muted">&nbsp; 15 Minutes Ago</span>
            </p>
            <div className="clearfix"></div>
                <p className="mb-1">Lorem Ipsum is simply dummy text of the pr make  but also the leap into electronic typesetting, remaining um.</p>
                <p className="">
                    <a className="float-right  mr-2 "> Reply</a>
            </p>
            </div>
        </div>
    )
}
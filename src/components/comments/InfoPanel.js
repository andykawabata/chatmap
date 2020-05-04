import React from 'react'

export default function InfoPanel(props){
    const photoString ="https://maps.googleapis.com/maps/api/place/photo?photoreference="+ props.photo +  "&sensor=false&maxheight=500&maxwidth=500&key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    return(
        <React.Fragment>
                <div className="text-center w-100 bg-dark">
                    <img className="img img-responsive " src={photoString} className="img img-responsive full-width" />
                </div>
                <div className="m-2">
                    <h4>{props.name}</h4>
                    <p><i>{props.type }</i></p>
                    <p className="d-none d-sm-block">{props.address }</p>
                </div>
        </React.Fragment>
    )
    
}
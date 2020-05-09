import React from 'react'

export default function InfoSection(props){

    function removeUnderScoreAndCapitalize(str){
        if(!str.includes('_'))
            return str.charAt(0).toUpperCase() + str.slice(1);
        let wordArray = str.split('_')
        let newWord = "";
        let space;
        for(var i = 0; i < wordArray.length; i++){
            space = (i == wordArray.length -1) ? "" : " "
            console.log("i = " + i)
            newWord +=  wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1) + space
        }
        return newWord
    }

    const typeCapital = removeUnderScoreAndCapitalize(props.type);
    const photoString ="https://maps.googleapis.com/maps/api/place/photo?photoreference="+ props.photo +  "&sensor=false&maxheight=500&maxwidth=500&key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    return(
        <React.Fragment>
            <div className="info-pic">
                <div className="background" style={{backgroundImage: "url(" + photoString + ")"}}></div>
                <img  src={photoString}/>
            </div>
            <div className="name-type">
                <h6>{props.name}</h6>
                <span className="light-text"><i>{typeCapital}</i></span>
            </div>
            <div className="spacer">
                <span>Recent Comments</span>
            </div>
        </React.Fragment>
    )
}



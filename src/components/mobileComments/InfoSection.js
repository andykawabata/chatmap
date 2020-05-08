import React from 'react'

export default function InfoSection(props){

    return(
        <React.Fragment>
            <div className="info-pic">
                <img class="" src="https://lp-cms-production.imgix.net/2019-06/3cb45f6e59190e8213ce0a35394d0e11-nice.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4"/>
            </div>
            <div className="name-type">
                <h6>Big Restaurant With Lots of Stuff</h6>
                <span className="light-text"><i>Restaurant</i></span>
            </div>
            <div className="spacer">
                <span>Recent Comments</span>
            </div>
        </React.Fragment>
    )
}



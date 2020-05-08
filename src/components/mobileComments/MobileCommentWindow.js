import React from 'react' 
import './MobileComments.css'
import InfoSection from './InfoSection'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default function MobileCommentWindow(props){

    return (
        <div className="flex-container">
            <InfoSection/>
            <CommentList/>
            <CommentForm/>

        </div>
    )
}
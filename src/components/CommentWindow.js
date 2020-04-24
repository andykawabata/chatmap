import React from 'react';
import "./CommentWindow.css"
import Comment from './Comment'

export default function CommentWindow(props){

    return( <div className="container my-container border rounded">
                <div className="row my-row border-bottom">
                    <div className="col-sm-3 order-sm-2 p-0 my-col">
                        <div className="text-center w-100 bg-dark">
                            <img className="img img-responsive " src="http://getwallpapers.com/wallpaper/full/5/f/c/748462-amazing-pretty-pictures-for-backgrounds-1920x1200-1080p.jpg" className="img img-responsive full-width" />
                        </div>
                            <div className="m-2">
                            <h4>Norm's Diner and Pizza Comedy</h4>
                            <p><i>Restaraunt</i></p>
                            <p className="d-none d-sm-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini</p>
                        </div>
                    </div>
                    <div className="col-sm-9 order-sm-1 my-col">
                        <div className="row p-2 bg-light border-bottom ">
                            <h5 className=" ">Recent Comments</h5>
                        </div>
                    
                        <div className="row">
                            <div className="comment-area">
                            



                            {props.children}
                



                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-row pt-2">
                    <div className="col my-col">
                    <form>
                        <div className="row">
                            <div className="col-10">
                                <div className="form-group">
                                    <input type="comment" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Say Something About This Place.."/>                 
                                </div>
                            </div>
                            <div className="col-2">
                                <button type="submit" className="btn btn-primary">Post</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                
            </div>)
}
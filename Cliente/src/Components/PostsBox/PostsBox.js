import React from 'react';
import { Link } from 'react-router-dom';
import './PostsBox.css';
import ReactionBar from '../ReactionBar/ReactionBar';
import CommentsBox from '../CommentsBox/CommentsBox';
export default function PostsBox() {

    return (
        <div className="container col-12">
            <div className="row">
                <div className="detailBox border col-12">
                    <div className="titleBox">
                        <label>Comment Box</label>
                        <button type="button" className="close" aria-hidden="true">&times;</button>
                    </div>
                    <div className="commentBox">
                        <div className="row">
                            <div className="col-4">
                                <img src="cinqueterre.jpg" className="img-thumbnail img-fluid" alt="Cinque Terre" />
                            </div>
                            <div className="col-8">
                                <p className="taskDescription">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                    </div>
                    <ReactionBar />
                    <CommentsBox />
                </div>
            </div>
        </div>
    )
}
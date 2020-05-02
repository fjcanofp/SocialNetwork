import React from 'react';
import './PostsBox.css';
import ReactionBar from '../ReactionBar/ReactionBar';
import CommentsBox from '../CommentsBox/CommentsBox';
import AuthService from "../../Services/AuthService";

export default function PostsBox({username}) {

    const User = AuthService.getUserInfo();

    return (
        <div className="container col-7">
            <div className="row">
                <div className="detailBox border col-12">
                    <div className="titleBox">
                        <label>{username}</label>
                        {username === User.name ? <button type="button" className="close" aria-hidden="true">&times;</button>:<></> }
                    </div>
                    <div className="commentBox">
                        <div className="row">
                            <div className="col-12">
                                <p className="taskDescription">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.</p>
                            </div>
                        </div>
                    </div>
                    <ReactionBar/>
                    <CommentsBox/>
                </div>
            </div>
        </div>
    )
}
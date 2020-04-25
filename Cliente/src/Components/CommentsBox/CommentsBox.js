import React from 'react';
import { Link } from 'react-router-dom';
import './CommentsBox.css';
import ReactionBar from '../ReactionBar/ReactionBar';
export default function PostsBox() {

    return (
        <div className="actionBox">
            <ul className="commentList collapse " id="collapseExample">
                <li>
                    <div className="commenterImage">
                        <img src="http://placekitten.com/50/50" />
                    </div>
                    <div className="commentText">
                        <p className="">Hello this is a test comment.</p> <span className="date sub-text">on March 5th, 2014</span>
                    </div>
                </li>
                <li>
                    <div className="commenterImage">
                        <img src="http://placekitten.com/45/45" />
                    </div>
                    <div className="commentText">
                        <p className="">Hello this is a test comment and this comment is particularly very long and it goes on and on and on.</p> <span className="date sub-text">on March 5th, 2014</span>
                    </div>
                </li>
                <li>
                    <div className="commenterImage">
                        <img src="http://placekitten.com/40/40" />
                    </div>
                    <div className="commentText">
                        <p className="">Hello this is a test comment.</p> <span className="date sub-text">on March 5th, 2014</span>
                    </div>
                </li>
            </ul>
            <form className="container-fluid col-12" role="form">
                <div className="row">
                    <div className="form-group col-9">
                        <input className="form-control" type="text" placeholder="Your comments" />
                    </div>
                    <div className="form-group col-3">
                        <button className="btn btn-default col-12 text-center">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
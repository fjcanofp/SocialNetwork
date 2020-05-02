import React, { useEffect, useState } from 'react';
import './PostsBox.css';
import ReactionBar from '../ReactionBar/ReactionBar';
import CommentsBox from '../CommentsBox/CommentsBox';
import AuthService from "../../Services/AuthService";
import PostService from '../../Services/HttpModule/PostService';

/**
 * To this component can be passed by props all this properties
 * in case of any of them dont exists will look for it in data service,
 * 
 * Only is required the postID
 */
export default function PostsBox({ postID , title , user , post_time }) {
    const User = AuthService.getUserInfo();
    
    let [ post, setPost ] = useState({
        _id : null,
        title: null,
        user : {},
        comments : [],
        post_time : null,
        reactions : [],
    })

    useEffect(()=>{
        if( !title || !user || !post_time ){
            PostService.getPostbyID( postID )
            .then( post =>{
                setPost(post)
            })
            .catch( error =>{
                alert(error)
            }) 
        }
        else{
            setPost( { postID , title , user , post_time } )
        }
    },[])

    return (
        <div className="container col-7 mb-4">
            <div className="row">
                <div className="detailBox border col-12">
                    <div className="titleBox">
                        <label>{post.user.name}</label>
                        {post.user.name === User.name ? <button type="button" className="close" aria-hidden="true">&times;</button>:<></> }
                    </div>
                    <div className="commentBox">
                        <div className="row">
                            <div className="col-12">
                                <p className="taskDescription">{post.title}</p>
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
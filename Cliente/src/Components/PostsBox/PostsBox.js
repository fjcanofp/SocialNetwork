import React, { useEffect, useState } from 'react';
import './PostsBox.css';
import ReactionBar from '../ReactionBar/ReactionBar';
import CommentsBox from '../CommentsBox/CommentsBox';
import AuthService from "../../Services/AuthService";
import PostService from '../../Services/HttpModule/PostService';
import FileService from '../../Services/HttpModule/FileService';
/**
 * To this component can be passed by props all this properties
 * in case of any of them dont exists will look for it in data service,
 * 
 * Only is required the postID
 */
export default function PostsBox({ postID, title, user, post_time, media }) {
    const User = AuthService.getUserInfo();

    let [filePreview, setFilePreview] = useState("");
    let [mimetype, setMimetipe] = useState("");

    let [post, setPost] = useState({
        _id: null,
        title: null,
        user: {},
        comments: [],
        post_time: null,
        reactions: [],
        media: {}
    })

    const isImagen = (mimetype) => {
        return ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(mimetype);
    }

    const isVideo = (mimetype) => {
        return ['video/mp4'].includes(mimetype);
    }
    
    useEffect(() => {
        PostService.getPostbyID(postID)
        .then(post => {
            setPost(post)
        })
        .catch(error => {
            console.log(error)
        })
    }, [ ])

    useEffect(() => {
        if(!post.media._id){ alert("No yet"); return ;}
        FileService.getFile(post.media._id)
        .then(file => {
            setFilePreview(file.url)
            setMimetipe(file.type)
        })
        .catch(error => {
            console.log(error)
        })
    }, [ post ])

    const doDeletePost = () => {
        PostService.delete(post.postID)
    }

    return (
        <div className="container col-7 mb-4">
            <div className="row">
                <div className="detailBox border col-12">
                    <div className="titleBox">
                        <label>{post.user.name}</label>
                        {post.user._id === User._id ? <button type="button" className="close" onClick={() => { doDeletePost() }} aria-hidden="true">&times;</button> : <></>}
                    </div>
                    <div className="commentBox">
                        <div className="row">
                            <div className="col-12">

                                {isImagen(mimetype) ?
                                    (<div className="col-4 text-center">
                                        <img src={filePreview} className="img-fluid border" alt="Responsive image" />
                                    </div>) : isVideo(mimetype) ?
                                        (<div className="col-4 text-center">
                                            <video controls>
                                                <source src={filePreview} type={true} />
                                            </video>
                                        </div>) : (<></>)
                                }
                                <p className="taskDescription">{post.title}</p>
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
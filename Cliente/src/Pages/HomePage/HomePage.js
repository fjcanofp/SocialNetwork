import React, { useState, useEffect } from 'react';
import './homePage.css';
import CreatePost from "../../Components/CreatePost/CreatePost";
import NavHeader from "../../Components/NavHeader/NavHeader";
import PostsBox from "../../Components/PostsBox/PostsBox";
import AuthService from '../../Services/AuthService';
import PostService from '../../Services/HttpModule/PostService';

export default function Home() {

    let [user, setUser] = useState({});
    let [posts , setPosts] = useState([]);

    useEffect(()=>{ 
        setUser(AuthService.getUserInfo)  
    },[])

    useEffect(()=>{ 
        PostService.getPost()
        .then(posts=>{
            setPosts(posts)
        })
        .catch(error=>{
            alert(error)
        })  
    },[])
    return (
        <div className="container-fluid">
            <NavHeader/>
            <main className="row col-12 align-top justify-content-center">
                <CreatePost/>
                
                { posts.map(( cur_post , index)=>{return (<PostsBox key={cur_post._id} postID={cur_post._id}  />) }) }
            </main>
        </div>
    )
}
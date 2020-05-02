import React from 'react';
import './homePage.css';
import CreatePost from "../../Components/CreatePost/CreatePost";
import NavHeader from "../../Components/NavHeader/NavHeader";
import PostsBox from "../../Components/PostsBox/PostsBox";


export default function Home() {
    return (
        <div className="container-fluid">
            <NavHeader/>
            <main className="row col-12 align-top justify-content-center">
                <CreatePost/>
                <PostsBox postID="5ead99599bc4c30ec4a55aab"/>
            </main>
        </div>
    )
}
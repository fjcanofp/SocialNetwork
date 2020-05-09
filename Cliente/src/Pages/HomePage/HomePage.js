import React, {useState, useEffect} from 'react';
import './homePage.css';
import CreatePost from "../../Components/CreatePost/CreatePost";
import NavHeader from "../../Components/NavHeader/NavHeader";
import PostsBox from "../../Components/PostsBox/PostsBox";
import AuthService from '../../Services/AuthService';
import PostService from '../../Services/HttpModule/PostService';

export default function Home() {

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const doDeletePost = (id) => {
        PostService.delete(id)
            .then(() => {
                setPosts(posts.filter(item => item._id !== id));
            })
            .catch(error => console.log(error))
    }

    const doCreatePost = (post) => {
        const postArr = [...posts].concat(post);
        postArr.sort((a, b) => {
            if (new Date(a.post_time) < new Date(b.post_time)) {
                return 1;
            } else return -1;
        })
        setPosts(postArr);
    }

    useEffect(() => {
        setUser(AuthService.getUserInfo)
    }, [])

    useEffect(() => {
        PostService.getPost()
            .then(posts => {
                setPosts(posts)
            })
            .catch(error => {
                alert(error)
            })
    }, [])
    return (
        <div className="container-fluid">
            <NavHeader/>
            <main className="row col-12 align-top justify-content-center">
                <CreatePost onCreatePost={doCreatePost}/>
                {posts.map((cur_post) => {
                    return (<PostsBox key={cur_post._id} postID={cur_post._id} onDelete={() => {
                        doDeletePost(cur_post._id)
                    }}/>)
                })}
            </main>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostsBox from '../../Components/PostsBox/PostsBox';
import CreatePost from '../../Components/CreatePost/CreatePost';
import './ProfilePage.css';

export default function ProfilePage() {
    const [isData, setisData] = useState(false);
    let { id } = useParams();


    return <div className="container">
        <div className="row profile">
            <div className="col-md-3 mb-4">
                <div className="profile-sidebar">
                    <div className="profile-userpic text-center">
                        <img src="https://image.shutterstock.com/image-illustration/very-big-size-man-without-260nw-126920099.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            Jhon Doe
					</div>
                        <div className="profile-usertitle-job">
                            Developer
					</div>
                    </div>
                    <div className="profile-userbuttons col-12">
                        <button type="button" className="btn btn-success btn-sm col-12">Follow</button>
                        <button type="button" className="btn btn-danger btn-sm col-12">Message</button>
                    </div>
                </div>
                <br />
                <div className="profile-sidebar m-0">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Posts
                            <span class="badge badge-primary badge-pill">14</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Follow
                            <span class="badge badge-primary badge-pill">2</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Followers
                            <span class="badge badge-primary badge-pill">1</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Team
                            <span class="badge badge-primary badge-pill">1</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-9">
                <div className="profile-content">
                    <CreatePost />
                    <hr />
                    <PostsBox />
                </div>
            </div>
        </div>
    </div>;
}
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './ProfilePage.css';
import NavHeader from "../../Components/NavHeader/NavHeader";
import AuthService from "../../Services/AuthService";
import PostsBox from "../../Components/PostsBox/PostsBox";
import PostService from "../../Services/HttpModule/PostService";

export default function ProfilePage() {

    const User = AuthService.getUserInfo();
    const idProfile = window.location.pathname.split('/')[2];
    const samePerson = User._id === idProfile;

    //Inputs form
    const [userName, setUserName] = useState(User.name);
    const [lastName, setLastName] = useState(User.lastName);
    const [mobile, setMobile] = useState(User.mobile);
    const [birthday, setBirthday] = useState(User.birthday);
    const [email, setEmail] = useState(User.login);
    const [location, setLocation] = useState(User.location);

    const [filePreview, setFilePreview] = useState(User.avatar ? User.avatar : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png");

    const isImagen = (mimetype) => {
        return ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(mimetype);
    }

    const avatar = (evt) => {
        if (!evt.target.files[0]) {
            return
        }

        if (isImagen(evt.target.files[0].type)) {
            setFilePreview(URL.createObjectURL(evt.target.files[0]))
        } else {
            //Error
        }
    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        PostService.getPostbyID(idProfile)
            .then(posts => {
                setPosts(posts)
            })
            .catch(() => {
                alert("error")
            })
    }, []);

    function editUser(evt) {
        evt.preventDefault();

        const editedUser = {};
        const password2 = document.getElementById("password2").value;
        for (const input of document.getElementsByTagName("input")) {
           if(input.name === "first_name") editedUser.name = userName;
           if(input.name === "last_name") editedUser.lastName = lastName;
           if(input.name === "mobile") editedUser.mobile = mobile;
           if(input.name === "birthday") editedUser.birthday = birthday;
           if(input.name === "location") editedUser.location = location;
           if(input.name === "password" && input.value !== "" && password2 === ""){
               alert("Please write again your password in the next box");
               return;
           }
           else if(input.name === "password" && input.value === "" && password2 !== ""){
               alert("Please write again your password in the previous box");
               return;
           }
           else if(input.name === "password" && input.value !== "" && password2 !== ""){
                if(input.value === password2) editedUser.password = password2;
                else{
                    alert("Passwords do not mactch");
                    return;
                }
           }

        }

        editedUser.avatar = filePreview;
        AuthService.setUserInfo(editedUser);
    }

    return (
        <div className="container-fluid">
            <NavHeader/>

            <div className="row ">
                <div className="col-sm-3 align-items-center">
                    <div className="text-center">
                        <img src={filePreview}
                             className="avatar thumbnail rounded-circle img-thumbnail" alt="avatar"/>
                        {!samePerson ? <></> : (
                            <>
                                <h6>Upload a different photo...</h6>
                                <input type="file" className="text-center center-block file-upload"
                                       onChange={(evt) => avatar(evt)}/>
                            </>
                        )}

                    </div>
                    <br/>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-warning text-muted h4"><i
                            className="fas fa-poll fa-2x mr-2 text-warning"/>Activity
                        </li>
                        <li className="list-group-item list-group-item-action text-right"><span
                            className="pull-left"><strong>Posts</strong></span>
                            <span className="badge badge-primary badge-pill">125</span>
                        </li>
                        <li className="list-group-item list-group-item-action text-right"><span
                            className="pull-left"><strong>Shares</strong></span>
                            <span className="badge badge-primary badge-pill">13</span>
                        </li>
                        <li className="list-group-item text-right"><span
                            className="pull-left"><strong>Likes</strong></span>
                            <span className="badge badge-primary badge-pill">37</span>
                        </li>
                        <li className="list-group-item text-right"><span
                            className="pull-left"><strong>Friends</strong></span>
                            <span className="badge badge-primary badge-pill">74</span>
                        </li>
                    </ul>
                </div>

                <div className="col-sm-9" style={{marginTop: "auto"}}>
                    {!samePerson ? (
                        <>
                            {posts.map((cur_post) => {
                                return (<PostsBox key={cur_post._id} postID={cur_post._id} title={cur_post.title}
                                                  user={cur_post.user} post_time={cur_post.post_time}/>)
                            })}
                        </>
                    ) : (
                        <form className="form" onSubmit={editUser} method="post" id="registrationForm">
                            <div className="form-group">

                                <div className="col-xs-6">
                                    <label htmlFor="first_name"><h4>First name</h4></label>
                                    <input type="text" className="form-control" name="first_name" id="first_name"
                                           placeholder="first name" value={userName}
                                           onChange={(evt) => setUserName(evt.target.value)}
                                           title="enter your first name if any." required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-6">
                                    <label htmlFor="last_name"><h4>Last name</h4></label>
                                    <input type="text" className="form-control" name="last_name" id="last_name"
                                           placeholder="last name" value={lastName}
                                           onChange={(evt) => setLastName(evt.target.value)}
                                           title="enter your last name if any."/>
                                </div>
                            </div>

                            <div className="form-group">

                                <div className="col-xs-6">
                                    <label htmlFor="mobile"><h4>Mobile</h4></label>
                                    <input type="tel" className="form-control" name="mobile" id="mobile"
                                           placeholder="666-77-88-99"
                                           value={mobile} onChange={(evt) => setMobile(evt.target.value)}
                                           title="enter your mobile number if any."/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-6">
                                    <label htmlFor="birthday"><h4>Birthday</h4></label>
                                    <input type="date" className="form-control" name="birthday" id="birthday"
                                           placeholder="dd/mm/yyyy" min="1940/01/01"
                                           value={birthday} onChange={(evt) => setBirthday(evt.target.value)}
                                           title="enter your date of birthday."/>
                                </div>
                            </div>
                            <div className="form-group">

                                <div className="col-xs-6">
                                    <label htmlFor="email"><h4>Email</h4></label>
                                    <input type="email" className="form-control" name="email" id="email"
                                           placeholder="you@email.com" value={email}
                                           onChange={(evt) => setEmail(evt.target.value)}
                                           title="You cannot change the email." disabled/>
                                </div>
                            </div>
                            <div className="form-group">

                                <div className="col-xs-6">
                                    <label htmlFor="email"><h4>Location</h4></label>
                                    <input type="text" className="form-control" id="location" name="location"
                                           placeholder="somewhere"
                                           value={location} onChange={(evt) => setLocation(evt.target.value)}
                                           title="enter a location"/>
                                </div>
                            </div>
                            <div className="form-group">

                                <div className="col-xs-6">
                                    <label htmlFor="password"><h4>Password</h4></label>
                                    <input type="password" className="form-control" name="password" id="password"
                                           placeholder="new password" title="enter your password." autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">

                                <div className="col-xs-6">
                                    <label htmlFor="password2"><h4>Repeat password</h4></label>
                                    <input type="password" className="form-control" name="password2" id="password2"
                                           placeholder="repeat new password"
                                           title="enter your password again in order to verify." autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <br/>
                                    <button className="btn btn-lg btn-warning" type="submit"><i
                                        className="glyphicon glyphicon-ok-sign"/>Save
                                    </button>
                                    <button className="btn btn-lg btn-danger ml-3" type="reset"><i
                                        className="glyphicon glyphicon-repeat"/> Reset
                                    </button>
                                </div>
                            </div>
                        </form>)}

                    <hr/>

                </div>
            </div>
        </div>
    );
}



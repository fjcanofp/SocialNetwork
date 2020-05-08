import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import NavHeader from "../../Components/NavHeader/NavHeader";
import AuthService from "../../Services/AuthService";
import PostsBox from "../../Components/PostsBox/PostsBox";
import PostService from "../../Services/HttpModule/PostService";
import UsersService from "../../Services/HttpModule/UsersService";
import {useParams} from "react-router-dom";
import Alert, {AlertTypes} from '../../Components/Alert/Alert';
import ModalInformation from "../../Components/Modal/ModalInformation";
import ModalConfirmation from "../../Components/Modal/ModalConfirmation";

export default function ProfilePage() {

    const {id} = useParams();
    const userInfo = AuthService.getUserInfo();
    const samePerson = userInfo._id === id;

    const User = {
        name: userInfo.name || '',
        lastName: userInfo.lastName || '',
        mobile: userInfo.mobile || '',
        birthday: userInfo.birthday || '',
        email: userInfo.login || '',
        location: userInfo.location || '',
        password: '',
        password2: ''
    };
    const [reqState, setRequestState] = useState({});
    const [userEdited, setUserEdited] = useState(User);

    const handleInput = (event) => {
        setUserEdited({
            ...userEdited,
            [event.target.name]: event.target.value
        });
    }

    const [filePreview, setFilePreview] = useState(userInfo.avatar ? userInfo.avatar : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png");

    const isImagen = (mimetype) => {
        return ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(mimetype);
    }

    const avatar = (evt) => {
        if (!evt.target.files[0]) {
            return
        }
        if (isImagen(evt.target.files[0].type)) {
            setFilePreview(URL.createObjectURL(evt.target.files[0]))
            setRequestState({});
        } else {
            evt.target.value = null;
            setRequestState({
                type: AlertTypes.WARN,
                messages: 'Invalid avatar format. Please, introduce some of the following: .gif, .png, .jpeg, .bmp, .webp'
            })
        }
    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        PostService.getUserPosts(id)
            .then(posts => {
                setPosts(posts)
            })
            .catch(() => {
                alert("error")
            })
    }, []);

    function editUser(evt) {
        evt.preventDefault();


        if (userEdited.password === '' && userEdited.password2 === ''){
            setRequestState({});
            delete userEdited.password;
            delete userEdited.password2;
        }
        if (userEdited.password !== '' && userEdited.password2 === '') {
            setRequestState({type: AlertTypes.ERROR, messages: 'Repeat your password in the next box, please'})
            return;
        }
        if (userEdited.password2 !== '' && userEdited.password === '') {
            setRequestState({type: AlertTypes.ERROR, messages: 'Repeat your password in the previous box, please'})
            return;
        }
        if (userEdited.password !== '' && userEdited.password2 !== '') {
            if (userEdited.password === userEdited.password2) {
                delete userEdited.password2;
                setRequestState({});
            } else{
                setRequestState({type: AlertTypes.ERROR, messages: 'Passwords do not match'});
                return;
            }
        }

        userEdited._id = userInfo._id;
        userEdited.avatar = filePreview;
        document.getElementById('modalProfile').click();
    }

    function reset(evt) {
        evt.preventDefault();
        setRequestState({});
        setUserEdited(User);
    }

    function handleModalProfile() {
        UsersService.modifyUser(userEdited)
            .then((userModified) => {
                AuthService.loginManager(userModified);
            })
            .catch((error) => {

            })
    }

    return (
        <>
            <ModalConfirmation
                messageBody={"You are about to make changes in your profile. Are you sure to procedure?"}
                handleClick={handleModalProfile}
            />
            <div className="container-fluid">
                <NavHeader/>
                <div className="row ">
                    <div className="col-sm-3 align-items-center">
                        <div className="text-center">
                            <img src={filePreview}
                                 className="avatar thumbnail rounded-circle img-thumbnail" alt="avatar"/>
                            {!samePerson ? <h4>{userInfo.name}</h4> : (
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
                            <form className="form" onSubmit={editUser} onReset={reset} method="post"
                                  id="registrationForm">
                                <Alert type={reqState.type} messages={reqState.messages}/>
                                <div className="form-group">

                                    <div className="col-xs-6">
                                        <label htmlFor="first_name"><h4>First name</h4></label>
                                        <input type="text" className="form-control" name="name" id="first_name"
                                               placeholder="first name" value={userEdited.name}
                                               onChange={handleInput}
                                               title="enter your first name if any." required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-6">
                                        <label htmlFor="last_name"><h4>Last name</h4></label>
                                        <input type="text" className="form-control" name="lastName" id="last_name"
                                               placeholder="last name" value={userEdited.lastName}
                                               onChange={handleInput}
                                               title="enter your last name if any."/>
                                    </div>
                                </div>

                                <div className="form-group">

                                    <div className="col-xs-6">
                                        <label htmlFor="mobile"><h4>Mobile</h4></label>
                                        <input type="tel" className="form-control" name="mobile" id="mobile"
                                               placeholder="666-77-88-99"
                                               pattern={"[\\d]{3}(-[\\d]{2}){2}-[\\d]{2}"}
                                               value={userEdited.mobile} onChange={handleInput}
                                               title="enter your mobile number if any."/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-xs-6">
                                        <label htmlFor="birthday"><h4>Birthday</h4></label>
                                        <input type="date" className="form-control" name="birthday" id="birthday"
                                               placeholder="dd/mm/yyyy" min="1940/01/01"
                                               max={new Date().toISOString().split("T")[0]}
                                               value={userEdited.birthday} onChange={handleInput}
                                               title="enter your date of birthday."/>
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div className="col-xs-6">
                                        <label htmlFor="email"><h4>Email</h4></label>
                                        <input type="email" className="form-control" name="email" id="email"
                                               placeholder={userEdited.email} value={userEdited.email}
                                               onChange={handleInput}
                                               title="You cannot change the email." disabled/>
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div className="col-xs-6">
                                        <label htmlFor="location"><h4>Location</h4></label>
                                        <input type="text" className="form-control" id="location" name="location"
                                               placeholder="somewhere"
                                               value={userEdited.location} onChange={handleInput}
                                               title="enter a location"/>
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div className="col-xs-6">
                                        <label htmlFor="password"><h4>Password</h4></label>
                                        <input type="password" className="form-control" name="password" id="password"
                                               placeholder="new password" title="enter your password."
                                               autoComplete="off"
                                               value={userEdited.password} onChange={handleInput}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div className="col-xs-6">
                                        <label htmlFor="password2"><h4>Repeat password</h4></label>
                                        <input type="password" className="form-control" name="password2" id="password2"
                                               placeholder="repeat new password"
                                               title="enter your password again in order to verify." autoComplete="off"
                                               value={userEdited.password2} onChange={handleInput}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <br/>
                                        <button className="btn btn-lg btn-warning" type="submit"><i
                                            className="glyphicon glyphicon-ok-sign"/> Save
                                        </button>
                                        <button
                                            id="modalProfile"
                                            style={{display: "none"}}
                                            data-toggle="modal"
                                            data-target="#staticBackdrop"/>
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
        </>
    );
}



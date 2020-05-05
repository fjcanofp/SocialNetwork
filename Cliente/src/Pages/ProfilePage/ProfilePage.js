import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ProfilePage.css';
import NavHeader from "../../Components/NavHeader/NavHeader";
import AuthService from "../../Services/AuthService";

export default function ProfilePage() {

    const [filePreview, setFilePreview] = useState("http://ssl.gstatic.com/accounts/ui/avatar_2x.png");
    const isImagen = (mimetype) => {
        return ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(mimetype);
    }
    const User = AuthService.getUserInfo();
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

    return (
        <div className="container-fluid">
            <NavHeader/>

            <div className="row ">
                <div className="col-sm-3">
                    <div className="text-center">
                        <img src={filePreview}
                             className="avatar thumbnail rounded-circle img-thumbnail" alt="avatar"/>
                        <h6>Upload a different photo...</h6>
                        <input type="file" className="text-center center-block file-upload" onChange={(evt) => avatar(evt)}/>
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
                    <form className="form" action="#" method="post" id="registrationForm">
                        <div className="form-group">

                            <div className="col-xs-6">
                                <label htmlFor="first_name"><h4>First name</h4></label>
                                <input type="text" className="form-control" name="first_name" id="first_name"
                                       placeholder="first name" title="enter your first name if any." required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-6">
                                <label htmlFor="last_name"><h4>Last name</h4></label>
                                <input type="text" className="form-control" name="last_name" id="last_name"
                                       placeholder="last name" title="enter your last name if any." required/>
                            </div>
                        </div>

                        <div className="form-group">

                            <div className="col-xs-6">
                                <label htmlFor="mobile"><h4>Mobile</h4></label>
                                <input type="text" className="form-control" name="mobile" id="mobile"
                                       placeholder="+34 XXX XX XX XX" title="enter your mobile number if any."/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-xs-6">
                                <label htmlFor="birthday"><h4>Birthday</h4></label>
                                <input type="date" className="form-control" name="birthday" id="birthday"
                                       placeholder="dd/mm/yyyy" title="enter your date of birthday."/>
                            </div>
                        </div>
                        <div className="form-group">

                            <div className="col-xs-6">
                                <label htmlFor="email"><h4>Email</h4></label>
                                <input type="email" className="form-control" name="email" id="email"
                                       placeholder="you@email.com" title="enter your email."/>
                            </div>
                        </div>
                        <div className="form-group">

                            <div className="col-xs-6">
                                <label htmlFor="email"><h4>Location</h4></label>
                                <input type="email" className="form-control" id="location" placeholder="somewhere"
                                       title="enter a location"/>
                            </div>
                        </div>
                        <div className="form-group">

                            <div className="col-xs-6">
                                <label htmlFor="password"><h4>Password</h4></label>
                                <input type="password" className="form-control" name="password" id="password"
                                       placeholder="password" title="enter your password."/>
                            </div>
                        </div>
                        <div className="form-group">

                            <div className="col-xs-6">
                                <label htmlFor="password2"><h4>Repeat password</h4></label>
                                <input type="password" className="form-control" name="password2" id="password2"
                                       placeholder="repeat password"
                                       title="enter your password again in order to verify."/>
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
                    </form>

                    <hr/>

                </div>
            </div>
        </div>
    );
}



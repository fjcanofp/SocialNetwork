import React from 'react';
import './homePage.css';
import AuthService from '../../Services/AuthService';
import {Link} from 'react-router-dom';

export default function Home() {

    const User = AuthService.getUserInfo();
    const avatar = 'http://i.stack.imgur.com/Dj7eP.jpg';

    return (
        <div className="d-block">
            <nav className="navbar sticky-top navbar-dark bg-dark">
                <Link className="navbar-brand" to={"/profile/"+User._id}>
                    <img id="avatar" className="d-inline-block align-top" alt="" style={{backgroundImage: `url(${avatar})`}}/>
                    {User.name}
                </Link>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        </div>
    )
}
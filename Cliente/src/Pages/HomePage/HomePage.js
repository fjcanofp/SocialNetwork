import React from 'react';
import './homePage.css';
import AuthService from '../../Services/AuthService';
import { Link } from 'react-router-dom';

export default function Home() {

    const User = AuthService.getUserInfo();
    const avatar = 'http://i.stack.imgur.com/Dj7eP.jpg';

    return (
        <div className="container-fluid">
            <div className="row">
                <nav class="col-12 navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
                    <div className="col-2">
                        <Link className="navbar-brand ml-lg-3" to={"/profile/" + User._id}>
                            <img id="avatar" alt="" style={{ backgroundImage: `url(${avatar})` }} />
                            {User.name}
                        </Link>
                    </div>
                    <div className="col-7"></div>
                    <div className="col-3">
                        <form className="float-right form-inline col-12">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        </div>
    )
}
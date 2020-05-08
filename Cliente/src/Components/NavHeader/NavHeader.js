import {Link, useHistory} from "react-router-dom";
import logOut from "../../Resources/img/log-out.svg";
import React from "react";
import AuthService from "../../Services/AuthService";
import ModalConfirmation from "../Modal/ModalConfirmation";
import './NavHeader.css';

export default function NavHeader() {

    const User = AuthService.getUserInfo();
    const avatar = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
    const history = useHistory();

    function handleModalNav () {
        AuthService.logOut();
        history.push("/");
    }

    return (
        <>
            <ModalConfirmation
                messageBody={"You are about to exit BASKBOOT. Are you sure to exit?"}
                handleClick={handleModalNav}
            />
            <div className="row">
                <nav className="col-12 navbar sticky-top navbar-dark bg-dark">
                    <div className="col-sm-1">
                        <Link className="navbar-brand col-3" to={"/profile/" + User._id}>
                            <img id="avatar" alt="" style={{backgroundImage: `url(${avatar})`}}/>
                            {User.name}
                        </Link>
                    </div>
                    <div className="col-sm-1">
                        <Link className='link' to={"/home"}>Home</Link>
                    </div>
                    <div className="col-sm-5 offset-sm-3">
                        <form className="float-right form-inline ">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                    <img id="log-out" src={logOut} className="col-1" alt="" data-toggle="modal"
                         data-target="#staticBackdrop"/>
                </nav>
            </div>
        </>
    )
}

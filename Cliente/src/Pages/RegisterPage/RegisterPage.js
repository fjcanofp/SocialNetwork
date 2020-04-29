import React, {useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import AuthService from '../../Services/AuthService';

export default function Register() {

    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        AuthService.registerManager({
            name: name,
            login: user,
            password: password
        })
            .then(user => {
                history.push("/home");
            })
            .catch(error => {
                setError(error);
            })
    }

    return (
        <>
            <span id="logo"><span id="logo-bask">Bask</span><span id="logo-book">book</span></span>
            <div id="logreg-forms">
                <form className="form-signin" onSubmit={handleSubmit}>
                    {error ? (<div className="alert alert-danger" role="alert">Registration error</div>) : (<></>)}
                    <input type="text" id="inputName" className="form-control" placeholder="Name" required=""
                           autoFocus="" value={name} onChange={(evt) => {
                        setName(evt.target.value)
                    }}/>
                    <br/>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                           autoFocus="" value={user} onChange={(evt) => {
                        setUser(evt.target.value)
                    }}/>
                    <br/>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required="" value={password} onChange={(evt) => {
                        setPassword(evt.target.value)
                    }}/>
                    <button id="register-signUp" className="btn btn-block" type="submit"><i
                        className="fas fa-sign-in-alt"/> Sign up
                    </button>
                    <hr/>
                    <Link to="/SignIn" className="btn btn-block" type="button" id="register-btn-signUp">Sign in</Link>
                </form>
            </div>
        </>
    )
}
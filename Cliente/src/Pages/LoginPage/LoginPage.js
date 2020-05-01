import React, {useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import AuthService from '../../Services/AuthService';
import './LoginPage.css';

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        AuthService.loginManager({
            login: user,
            password: password
        })
            .then( () => history.push("/home") )
            .catch(error =>  setError(error) )
    };

    return (
        <div className="login-bg">
            <div id="logreg-forms">
                <span id="logo"><span id="logo-bask">Baskt</span><span id="logo-book">book</span></span>
                <form className="form-signin" onSubmit={handleSubmit}>
                    {error ? (<div className="alert alert-danger" role="alert">Invalid Credentials</div>) : (<></>)}
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                           required
                           autoFocus="" value={user} onChange={(evt) => {
                        setUser(evt.target.value)
                    }}/>
                    <br/>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required="" value={password} onChange={(evt) => {
                        setPassword(evt.target.value)
                    }}/>
                    <button id="signIn" className="btn btn-block" type="submit"><i
                        className="fas fa-sign-in-alt"/> Sign
                        in
                    </button>
                    <Link to="/recovery" id="forgot_pswd">Forgot password?</Link>
                    <hr/>
                    <Link to="/SignUp" className="btn btn-block" type="button" id="signUp">Sign up New
                        Account</Link>
                </form>
            </div>
        </div>
    )
}

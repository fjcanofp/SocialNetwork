import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AuthService from '../../Services/AuthService';
import './LoginPage.css';

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [ error , setError ] = useState("");
    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        AuthService.loginManager({
            login: user,
            password: password
        })
        .then(User=>{
            alert(` Welcome ${User.login}`);
            history.push("/home");
        })
        .catch(error=>{
            setError(error);
        })
    }

    return (
        <div id="logreg-forms">
            <form className="form-signin" onSubmit={handleSubmit} >
                <h1 className="h3 mb-3 font-weight-normal text-center"> Sign in</h1>
                <hr/>
                { error ? (<div className="alert alert-warning" role="alert">Invalid Credentials</div>):(<></>) }
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" value={user} onChange={(evt) => { setUser(evt.target.value) }} />
                <br/>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" value={password} onChange={(evt) => { setPassword(evt.target.value) }} />
                <hr/>
                <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt"></i> Sign in</button>
                <Link to="/" id="forgot_pswd">Forgot password?</Link>
                <hr />
                <Link to="/SignUp" className="btn btn-primary btn-block text-light" type="button" id="btn-signup">Sign up New Account</Link>
            </form>
        </div>
    )
}

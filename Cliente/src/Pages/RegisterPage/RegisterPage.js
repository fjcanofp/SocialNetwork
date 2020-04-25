import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AuthService from '../../Services/AuthService';

export default function Register(  ) {
    
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [ error , setError ] = useState("");
    const history = useHistory();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        AuthService.registerManager({
            name : name ,
            login: user,
            password: password
        })
        .then( user =>{
            history.push("/home");
        })
        .catch(error=>{
            setError(error);
        })
    }

    return (
        <div id="logreg-forms">
            <form className="form-signin" onSubmit={handleSubmit} >
                <h1 className="h3 mb-3 font-weight-normal text-center"> Sign Up</h1>
                <hr/>
                { error ? (<div className="alert alert-warning" role="alert">Registration error</div>):(<></>) }
                <input type="text" id="inputName" className="form-control" placeholder="Name" required="" autoFocus="" value={name} onChange={(evt) => { setName(evt.target.value) }} />
                <br />
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" value={user} onChange={(evt) => { setUser(evt.target.value) }} />
                <br />
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" value={password} onChange={(evt) => { setPassword(evt.target.value) }} />
                <hr/>
                <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt"></i> Sign up</button>
                <hr />
                <Link to="/SignIn" className="btn btn-primary btn-block text-light" type="button" id="btn-signup">Sign in</Link>
            </form>
        </div>
    )
}
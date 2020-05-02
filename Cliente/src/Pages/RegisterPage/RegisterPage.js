import React, {useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import AuthService from '../../Services/AuthService';
import  Alert , { AlertTypes }  from '../../Components/Alert/Alert'

export default function Register() {

    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [reqState, setRequestState] = useState( {} );
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
                setRequestState({type : AlertTypes.ERROR , messages : 'Registration error'})
            })
    }

    return (
        <div className="login-bg">
            <div id="logreg-forms">
                <span id="logo"><span id="logo-bask">Baskt</span><span id="logo-book">book</span></span>
                <form className="form-signin" onSubmit={handleSubmit}>
                <Alert type={ reqState.type } messages={ reqState.messages }/>
                    <input type="text" id="inputName" className="form-control" placeholder="Name" required
                           autoFocus="" value={name} onChange={(evt) => {
                        setName(evt.target.value)
                    }}/>
                    <br/>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
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
        </div>
    )
}
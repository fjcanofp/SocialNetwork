import React, {useState} from 'react';
import {useParams , useHistory, Link} from "react-router-dom";
import RecoverService from '../../Services/HttpModule/RecoverService';
export default function RecoveryPage() {

    let { id } = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordBis, setPasswordBis] = useState("");
    const [secureID, setSecureID] = useState("");

    const [error, setError] = useState("");
    const history = useHistory();

    const makeRecovery = (evt) => {
        evt.preventDefault();

        RecoverService.doRecovery({ login : email, password :  password , recoveryID: secureID })
        .then(()=>{
            alert('Change Password')
        })
        .catch(error=>{
            setError(error)
        })
    }

    const applyRecovery= (evt)=>{
        evt.preventDefault();

        alert('ask for change Password')
        RecoverService.doRecoveryRequest({ login : email })
        .then(()=>{
            alert("DONE")
        })
        .catch(error=>{
            setError(error)
        })
    }
    return (
        <div className="login-bg">
            <div id="logreg-forms">
                <span id="logo"><span id="logo-bask">Baskt</span><span id="logo-book">book</span></span>
                <form className="form-signin">
                    {error ? (<div className="alert alert-danger" role="alert">Recovery Error</div>) : (<></>)}
                    <input type="text" id="inputEmail" className="form-control" placeholder="Email" required
                           autoFocus="" value={email} onChange={(evt) => {
                           setEmail(evt.target.value)
                    }}/>
                    { id ?
                        (
                            <>
                            <br/>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password here" required
                                autoFocus="" value={password} onChange={(evt) => {
                                setPassword(evt.target.value)
                            }}/>
                            <br/>
                            <input type="password" id="inputPasswordBis" className="form-control" placeholder="Password"
                                required="" value={passwordBis} onChange={(evt) => {
                                setPasswordBis(evt.target.value)
                            }}/>
                            <br/>
                            <input type="text" id="inputsecureCode" className="form-control" placeholder="DW2EX"
                                required="" value={secureID} onChange={(evt) => {
                                setSecureID(evt.target.value)
                            }}/>
                            <button id="register-signUp" className="btn btn-block" type="button" onClick={(evt=>{ makeRecovery(evt) })}><i
                                className="fas fa-sign-in-alt"/>Recovery
                            </button>
                            </>
                        ):(
                            <button id="register-signUp" className="btn btn-block" onClick={(evt=>{ applyRecovery(evt) })}><i
                                className="fas fa-sign-in-alt"/>Recovery
                            </button>
                        )}

                    <hr/>
                    <Link to="/SignIn" className="btn btn-block" type="button" id="register-btn-signUp">Sign in</Link>
                </form>
            </div>
        </div>
    )
}
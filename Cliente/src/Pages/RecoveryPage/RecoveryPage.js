import React, {useState} from 'react';
import {useParams , useHistory, Link} from "react-router-dom";
import RecoverService from '../../Services/HttpModule/RecoverService';
import  Alert , { AlertTypes }  from '../../Components/Alert/Alert'
export default function RecoveryPage() {

    let { id } = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordBis, setPasswordBis] = useState("");
    const [secureID, setSecureID] = useState("");

    const [reqState, setRequestState] = useState( {} );
    const history = useHistory();

    const makeRecovery = (evt) => {
        evt.preventDefault();

        RecoverService.doRecovery({ login : email, password :  password , recoveryID: secureID })
        .then(()=>{
            setRequestState({type : AlertTypes.SUCCESS , messages : 'your password has been successfully reset'})
        })
        .catch(error=>{
            setRequestState({ type : AlertTypes.ERROR , messages : 'An error occurred while trying to response your request'})
        })
    }

    const applyRecovery= (evt)=>{
        evt.preventDefault();
        RecoverService.doRecoveryRequest({ login : email })
        .then(( response )=>{
            setRequestState({ type : AlertTypes.SUCCESS , messages : 'An email to recover your password has been sent. Please check out your mailbox'})
        })
        .catch(error=>{
            setRequestState({ type : AlertTypes.ERROR , messages : 'An error occurred while trying to response your request'})
        })
    }

    return (
        <div className="login-bg">
            <div id="logreg-forms">
                <span id="logo"><span id="logo-bask">Baskt</span><span id="logo-book">book</span></span>
                <form className="form-signin">
                    <Alert type={ reqState.type } messages={ reqState.messages }/>
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
                            <br />
                            <button id="register-signUp" className="btn btn-block" type="button" onClick={(evt=>{ makeRecovery(evt) })}><i
                                className="fas fa-sign-in-alt"/>Recovery
                            </button>
                            </>
                        ):(
                            <>
                            <br />
                            <button id="register-signUp" className="btn btn-block" onClick={(evt=>{ applyRecovery(evt) })}><i
                                className="fas fa-sign-in-alt"/>Recovery
                            </button>
                            </>
                        )}

                    <hr/>
                    <Link to="/SignIn" className="btn btn-block" type="button" id="register-btn-signUp">Sign in</Link>
                </form>
            </div>
        </div>
    )
}
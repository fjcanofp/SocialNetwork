import React from "react";
import AuthService from "../../Services/AuthService";
import {useHistory} from 'react-router-dom';

export default function ModalConfirmation () {

    const history = useHistory();
    const handleClick = () => {
        AuthService.logOut();
        history.push("/");
    };

    return(
        <div className="modal" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle"><span style={{color: "darkorange", fontWeight: "bold"}}>BASKT<span style={{ color: "black",fontWeight: "bold"}}>BOOK</span></span></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        You are about to exit BasktBook. Are you sure?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-danger" data-dismiss="modal">I'll be around a
                            little bit more
                        </button>
                        <button type="button" className="btn btn-primary btn-warning" data-dismiss="modal" onClick={ handleClick }>Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
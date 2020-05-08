import React from "react";


export default function ModalConfirmation ({handleClick, messageBody}) {


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
                        {messageBody}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-warning" data-dismiss="modal" onClick={ handleClick }>OK
                        </button>
                        <button type="button" className="btn btn-secondary btn-danger" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
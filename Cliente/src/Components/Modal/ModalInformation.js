import React from "react";

export default function ModalInformation ({message}) {

    return(
        <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle"><span style={{color: "darkorange", fontWeight: "bold"}}>BASKT<span style={{ color: "black",fontWeight: "bold"}}>BOOK</span></span></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{message}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-warning" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
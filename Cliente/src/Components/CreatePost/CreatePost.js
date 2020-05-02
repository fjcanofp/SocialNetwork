import React, {useState, useEffect} from 'react';
import PostService from '../../Services/HttpModule/PostService'
import ModalInformation from "../Modal/ModalInformation";

export default function CreatePost() {
    const [postText, setPostText] = useState("");

    const doPost = () => {
        PostService.doPost({"title": postText})
            .then(response => {
                alert(response)
            })
            .catch(() => {
                document.getElementById('modal-info').click();
            })
    }

    return (
        <>
            <ModalInformation message={"Ups, something went wrong trying to publish your post. Please, try it again or later."}/>
            <div className="card col-7 m0-auto mb-5" style={{height: "20rem"}}>
                <div className="card-body">
                    <div className="row">
                        <div className="form-group col-10">
                            <textarea className="form-control" style={{height: "13rem", resize: "none"}}
                                      placeholder="What's new today?" value={postText} onChange={(evt) => {
                                setPostText(evt.target.value)
                            }}/>
                        </div>
                        <div className="form-group col-2 offset-10">
                            <button onClick={doPost} className="btn btn-default col-12 text-center">Post</button>
                            <button style={{display: "none"}} id="modal-info" data-toggle="modal"
                                    data-target="#exampleModal"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import React, { useState, useEffect } from 'react';
import PostService from '../../Services/HttpModule/PostService'
import ModalInformation from "../Modal/ModalInformation";
import './CreatePost.css';
export default function CreatePost() {

    const [postText, setPostText] = useState("");
    const [postMedia, setPostMedia] = useState("");
    const [filePreview, setFilePreview] = useState("");

    const previeFile = (evt) => {
        if(!evt.target.files[0]){
            return
        }

        if (isImagen(evt.target.files[0].type)) {
            /* const reader = new FileReader()
            reader.readAsDataURL(evt.target.files[0])
            reader.onloadend = evt => {
                setFilePreview(reader.result)
            } */
            console.log(evt.target.files[0])
            setFilePreview(URL.createObjectURL(evt.target.files[0]))
            setPostMedia(evt.target.files[0])
        }
        else if( isVideo(evt.target.files[0].type) ){
            setFilePreview(URL.createObjectURL(evt.target.files[0]))
            setPostMedia(evt.target.files[0])
        }
        else{
            alert("FILE TYPE NO VALID")
            return
        }
        
    }

    const isImagen = (mimetype) => {
        return ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(mimetype);
    }

    const isVideo = (mimetype) => {
        return ['video/mp4'].includes(mimetype);
    }

    const doPost = () => {
        let formData = new FormData();
        formData.set('media',postMedia);
        formData.set('title',postText);
        PostService.doPost( formData )
            .then(response => {
                alert(response)
            })
            .catch(() => {
                document.getElementById('modal-info').click();
            })
    }

    return (
        <>
            <ModalInformation message={"Ups, something went wrong trying to publish your post. Please, try it again or later."} />
            <div className="card col-7 m0-auto mb-5" style={{ height: "20rem" }}>
                <div className="card-body">
                    <div className="row">
                        {isImagen(postMedia.type) ? 
                            (<div className="col-4 text-center">
                                <img src={filePreview} className="img-fluid border" alt="Responsive image" />
                            </div>) :isVideo(postMedia.type)?
                            (<div className="col-4 text-center">
                                <video controls>
                                    <source src={filePreview} type={postMedia.type}/>
                                </video>
                            </div>):(<></>)
                        }
                        <div className={"form-group " + (!postMedia ? 'col-12' : 'col-8')}>
                            <textarea className="form-control" style={{ height: "13rem", resize: "none" }}
                                placeholder="What's new today?" value={postText} onChange={(evt) => { setPostText(evt.target.value) }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <button className="col-2 btn btn-default" onClick={() => { document.getElementById('file').click() }}>
                                <i className="fa fa-file-image-o"></i>
                                <input id="file" type="file" className="d-none custom-file-input" onChange={(evt) => { previeFile(evt); }} />
                            </button>
                            <button onClick={doPost} className="btn btn-default col-10 text-center">Post</button>
                            <button style={{ display: "none" }} id="modal-info" data-toggle="modal"
                                data-target="#exampleModal" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
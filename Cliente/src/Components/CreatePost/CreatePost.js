import React, { useState, useEffect } from 'react';
import PostService from '../../Services/HttpModule/PostService'
import ModalInformation from "../Modal/ModalInformation";
import './CreatePost.css';
export default function CreatePost( {onCreatePost}) {

    const [postText, setPostText] = useState("");
    const [postMedia, setPostMedia] = useState("");
    const [filePreview, setFilePreview] = useState("");

    const previewFile = (evt) => {
        if(!evt.target.files[0]){
            return
        }

        if (isImagen(evt.target.files[0].type)) {
            setFilePreview(URL.createObjectURL(evt.target.files[0]))
            setPostMedia(evt.target.files[0])
        }
        else if( isVideo(evt.target.files[0].type) ){
            setFilePreview(URL.createObjectURL(evt.target.files[0]))
            setPostMedia(evt.target.files[0])
        }
        else{
            alert("FILE TYPE NO VALID")
            return;
        }

    }

    const isImagen = (mimetype) => {
        return ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(mimetype);
    }

    const isVideo = (mimetype) => {
        return ['video/mp4'].includes(mimetype);
    }

    const doPost = () => {
        const formData = new FormData();
        formData.set('media',postMedia);
        formData.set('title',postText);
        PostService.doPost( formData )
            .then(response => {
                setPostText("");
                setPostMedia("");
                setFilePreview("");
                onCreatePost(response);
            })
            .catch(() => {
                document.getElementById('modal-info').click();
            })
    }

    return (
        <>
            <ModalInformation message={"Ups, something went wrong trying to publish your post. Please, try it again or later."} />
            <div className="card col-sm-7 m0-auto mb-5" style={{ height: "20rem" }}>
                <div className="card-body">
                    <div className="row">
                        {isImagen(postMedia.type) ? 
                            (<div className="col-sm-4 text-center">
                                <img id="createPostImage" src={filePreview} className="img-fluid border" alt="Responsive image" />
                            </div>) :isVideo(postMedia.type)?
                            (<div className="col-sm-4 text-center ">
                                <video id="createPostVideo" className="img-fluid" controls>
                                    <source src={filePreview} type={postMedia.type}/>
                                </video>
                            </div>):(<></>)
                        }
                        <div className={"form-group " + (!postMedia ? 'col-sm-12' : 'col-sm-8')}>
                            <textarea className="form-control" style={{ height: "13rem", resize: "none" }}
                                placeholder="What's new today?" value={postText} onChange={(evt) => { setPostText(evt.target.value) }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <button className="col-sm-2 btn btn-default" onClick={() => { document.getElementById('file').click() }}>
                                <i className="fa fa-file-image-o"/>
                                <input id="file" type="file" className="d-none custom-file-input" onChange={(evt) => { previewFile(evt); }} />
                            </button>
                            <button onClick={doPost} className="btn btn-default col-sm-4 offset-sm-6 text-center">Post</button>
                            <button style={{ display: "none" }} id="modal-info" data-toggle="modal"
                                data-target="#exampleModal" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
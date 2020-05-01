import React, { useState, useEffect } from 'react';
import PostService from '../../Services/HttpModule/PostService'
export default function CreatePost() {
    
    const [postText, setPostText] = useState("");

    const doPost = ()=>{
        PostService.doPost({ "title" : postText})
        .then( response =>{
            alert(response)
        })
        .catch( error =>{   
            alert(error)
        })
    }

    return (
        <div className="card">
            <div className="card-header">
                Posts
            </div>
            <div className="card-body">
                <div className="row">
                    <img src="http://placekitten.com/45/45" className="rounded float-left col-3 h-100 pb-4" alt="..." />
                    <div className="form-group col-9">
                        <input className="form-control h-100" type="text" placeholder="¿Qué te cuentas hoy?" value={postText} onChange={(evt) => { setPostText(evt.target.value) }}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <button onClick={ doPost } className="btn btn-default col-12 text-center">Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
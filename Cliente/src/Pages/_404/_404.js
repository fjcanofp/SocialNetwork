import React from 'react';
import './_404.css'

export default function _404() {

    return (
        <div className="container-fluid full-sc">
            <div className="row h-100 d-flex justify-content-center">
                <div className="col-8 col-md-10 align-self-center">
                    <div className="card card-block">
                        <div className="card-header bg-danger text-white text-uppercase">
                            404 not found
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>“I can accept failure, everyone fails at something. But I can't accept not trying.”</p>
                                <footer className="blockquote-footer">Michael Jordan</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
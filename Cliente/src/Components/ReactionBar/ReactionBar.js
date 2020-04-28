import React from 'react';

export default function ReactionBar() {

    return (
        <div className="row">
            <div className="col-12">
                <div type="button" className="btn" data-toggle="collapse" data-target="#collapseExample">
                    comments
                </div>
                <button className="btn"><i className="far fa-thumbs-up"></i></button>
                <button className="btn"><i className="far fa-thumbs-down"></i></button>
                <button className="btn"><i className="far fa-star"></i></button>
                <button className="btn"><i className="far fa-heart"></i></button>
            </div>
        </div>
    )
}
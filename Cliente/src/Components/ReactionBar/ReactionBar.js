import React from 'react';
import './ReactionBar.css';

export default function ReactionBar() {

    const handleClick = (evt) =>{
        if(evt.target.className === "far fa-thumbs-up" || evt.target.className ==="far fa-thumbs-up darkorange") evt.target.classList.toggle('darkorange');
        else if(evt.target.className === "far fa-thumbs-down" ||  evt.target.className === "far fa-thumbs-down blue") evt.target.classList.toggle('blue');
        else if(evt.target.className === "far fa-star" || evt.target.className === "far fa-star yellow") evt.target.classList.toggle('yellow');
        else if(evt.target.className === "far fa-heart" ||  evt.target.className === "far fa-heart red") evt.target.classList.toggle('red');
    }

    return (
        <div className="row">
            <div className="col-12">
                <div type="button" className="btn" data-toggle="collapse" data-target="#collapseExample">
                    comments
                </div>
                <button onClick={handleClick} className="btn"><i className="far fa-thumbs-up"/></button>
                <button onClick={handleClick} className="btn"><i className="far fa-thumbs-down"/></button>
                <button onClick={handleClick} className="btn"><i className="far fa-star"/></button>
                <button onClick={handleClick} className="btn"><i className="far fa-heart"/></button>
            </div>
        </div>
    )
}
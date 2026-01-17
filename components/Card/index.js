// Card.jsx
'use client';
import React, {useState} from 'react';
import './card.modules.css';
import {deleteApplication} from "../../app/applications/actions";
import {EditApplicationForm} from "../ApplicationForm"; // Import the CSS file

const Card = ({ title, description, imageUrl, id, item, buttonTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const link = `/applications/${id}`;
    return (
        <div className="card" >
            {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
            <form action={deleteApplication} className="form-delete">
                <input type="hidden" name="id" value={id} />
                <button className="button-delete" type="submit"></button>
            </form>

            <button className="button-edit" onClick={() => setIsOpen(true)}></button>
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >x</button>
                        <EditApplicationForm item={item} buttonTitle={buttonTitle} />
                    </div>
                </div>
                )}
            <div className="card-content" >
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <a href={link} className="card-link">Learn More</a>
            </div>
        </div>
    );
};

export default Card;

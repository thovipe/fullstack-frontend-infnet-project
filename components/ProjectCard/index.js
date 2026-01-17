// Card.jsx
'use client';
import React, {useState} from 'react';
import styles from './projectcard.module.css';
import {deleteProject} from "../../src/actions/actions";
import {EditProjectForm} from "../ProjectForm";

const ProjectCard = ({ title, description, imageUrl, id, item, buttonTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const link = `/projects/${id}`;
    return (
        <div className={styles.card} >
            {imageUrl && <img src={imageUrl} alt={title} className={styles.cardImage} />}
            <form action={deleteProject} className={styles.formDelete}>
                <input type="hidden" name="id" value={id} />
                <button className={styles.buttonDelete} type="submit"></button>
            </form>

            <button className={styles.buttonEdit} onClick={() => setIsOpen(true)}></button>
            {isOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                        >x</button>
                        <EditProjectForm item={item} buttonTitle={buttonTitle} />
                    </div>
                </div>
            )}
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardDescription}>{description}</p>
                <a href={link} className={styles.cardLink}>Learn More</a>
            </div>
        </div>
    );
};

export default ProjectCard;

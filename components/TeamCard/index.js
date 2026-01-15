'use client';

import React, {useState} from "react";
import styles from "./teamcard.module.css"
import {deleteTeam} from "../../src/actions/actions";
import {EditTeamForm} from "../../components/TeamForm";

export default function TeamCard({item, imageUrl, title, id, buttonTitle, description}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.teamCard}>
            {imageUrl && <img src={imageUrl} alt={title} className={styles.img}/>}
            <form action={deleteTeam} className={styles.formDelete}>
                <input type="hidden"  name="id" value={id}/>
                <button type="submit"></button>
            </form>
            <button className={styles.buttonEdit} onClick={() => setIsOpen(true)}></button>
            {isOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                        >x
                        </button>
                        <EditTeamForm item={item} buttonTitle={buttonTitle}></EditTeamForm>
                    </div>
                </div>
            )
            }
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardDescription}>{description}</p>
                <a href="#" className={styles.cardLink}>Learn More</a>
            </div>
        </div>
    );
};
'use client';

import Input from "../Input";
import {createProject, updateProject} from "../../src/actions/actions.tsx";
import styles from "./projectform.module.css"
import {useActionState, useState} from "react";


export default function ProjectForm({items, buttonTitle}) {
    const [state, formAction] = useActionState(createProject, null);

    function capitalizeFirstLetter(str) {
        if (!str) {
            return ""; // Handle empty or null strings
        }
        const firstLetter = str.charAt(0).toUpperCase();
        const restOfString = str.slice(1);
        return firstLetter + restOfString;
    }

    return (
        <>
            <div className="formContainer">
                <form className="inputContainer" action={formAction}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <label>{capitalizeFirstLetter(item.name)}: </label> <Input type={item.type} key={index} name={item.name} placeholder={item.placeholder} />
                        </div>
                    ))}
                    <button className="buttonComponent" type="submit">{buttonTitle}</button>
                </form>
            </div>
            <div className="responseContainer">
                {state &&
                    (<p style={{color: state.success ? "green": "red"}}>
                        {state.message}
                    </p>)
                }
            </div>
        </>
    );
}

export function EditProjectForm({item, buttonTitle}) {

    const [project, setProject] = useState({
        id: item.id || "",
        name: item.name || "",
        description: item.description || "",
        ownerName: item.ownerName || ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setProject((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    return (
        <div>
            <form action={updateProject} className={styles.editForm}>
                <input
                    type="hidden"
                    name="id"
                    value={project.id}
                />
                <label htmlFor="project">Name :</label>
                <input
                    name="name"
                    value={project.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <label htmlFor="Description">Description :</label>
                <input
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <label htmlFor="OwnerName">OwnerName :</label>
                <input
                    name="ownerName"
                    value={project.ownerName}
                    onChange={handleChange}
                    placeholder="Owner Name"
                />
                <button className={styles.blueButton} type="submit">{buttonTitle}</button>
            </form>
        </div>
    );
}

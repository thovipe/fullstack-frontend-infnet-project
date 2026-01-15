'use client';

import Input from "../Input";
import "./applicationform.modules.css";
import {createApp, updateApplication} from "./actions";
import {useActionState, useEffect, useState} from "react";


export default function ApplicationForm({items, buttonTitle}) {
    const [state, formAction] = useActionState(createApp, null);

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

export function EditApplicationForm({item, buttonTitle}) {

    const [app, setApp] = useState({
        id: item.id || "",
        name: item.name || "",
        description: item.description || "",
        appTeamId: item.teamId || "",
        projectId: item.projectId || ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setApp((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    return (
        <div>
            <form action={updateApplication} className="editForm">
                <input
                    type="hidden"
                    name="id"
                    value={app.id}
                />
                <label htmlFor="app">Name :</label>
                <input
                    name="name"
                    value={app.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <label htmlFor="Description">Description :</label>
                <input
                    name="description"
                    value={app.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <label htmlFor="TeamId">TeamId :</label>
                <input
                    name="appTeamId"
                    value={app.appTeamId}
                    onChange={handleChange}
                    placeholder="Team ID"
                />
                <label htmlFor="ProjectId">ProjectId :</label>
                <input
                    name="projectId"
                    value={app.projectId}
                    onChange={handleChange}
                    placeholder="Project ID"
                />
                <button type="submit">{buttonTitle}</button>
            </form>
        </div>
    );
}
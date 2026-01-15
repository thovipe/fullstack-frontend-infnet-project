'use client';

import Input from "../Input";
import {createTeam, updateTeam,} from "../../src/actions/actions.tsx";
import {useActionState, useState} from "react";
import styles from "./teamform.module.css"

export default function TeamForm({items, buttonTitle}) {
    const [state, formAction] = useActionState(createTeam, null);

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
                            <label>{capitalizeFirstLetter(item.name)}: </label> <Input type={item.type} key={index} name={item.name} placeholder={item.placeholder}/>
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

export function EditTeamForm({item, buttonTitle}) {
    const [team, setTeam] = useState({
        id: item.id || "",
        name: item.name || "",
        description: item.description || "",
        memberIds: item.memberIds || ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setTeam((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    return (
        <div>
            <form action={updateTeam} className={styles.editForm}>
                <input
                    type="hidden"
                    name="id"
                    value={team.id}
                />
                <label htmlFor="team">Name :</label>
                <input
                    name="name"
                    value={team.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <label htmlFor="Description">Description :</label>
                <input
                    name="description"
                    value={team.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <label htmlFor="OwnerName">OwnerName :</label>
                <input
                    name="ownerName"
                    value={team.memberIds}
                    onChange={handleChange}
                    placeholder="Team member Ids comma separated."
                />
                <button className={styles.blueButton} type="submit">{buttonTitle}</button>
            </form>
        </div>
    );

}
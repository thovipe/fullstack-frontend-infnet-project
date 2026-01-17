"use client"
import { signOut } from "next-auth/react";
import styles from "./logout.module.css"

export default function Logout() {
    return <button className={styles.button} onClick={() => signOut()}>
        Click to SignOut
    </button>
}
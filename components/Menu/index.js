import styles from './menu.module.css';
import Link from "next/dist/client/link";

export default function Menu() {
    return ( <div className={styles.menu}>
        <Link href={"/"} >Home</Link>
        <Link href={"/applications"}>Applications</Link>
        <Link href={"/projects"}>Projects</Link>
        <Link href={"/teams"} >Teams</Link>
    </div>);

}
import {fetchProjectsById} from "../../../src/actions/actions";
import {getServerSession} from "next-auth";
import {authOptions} from "../../api/auth/[...nextauth]/auth";
import styles from "./projectId.module.css";

export default async function projectPage({params}) {
    const numPage = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div>
                User not authenticated.
            </div>
        )
    }

    const project = await fetchProjectsById(numPage.slug);

    if (!project) {
        return (
            <div>
                Failed to fetch project.
            </div>
        )
    }



    return (
        <div className={styles.appContainer}>
            <h2>{project.name}</h2>
            <label>Description: </label><p>{project.description}</p>
            <label>Owner Name:</label><p>{project.ownerName}</p>
            <img className={styles.img} alt="Project image" src={"/file.svg"}/>
        </div>
    )
}
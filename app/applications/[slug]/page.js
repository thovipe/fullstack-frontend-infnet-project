import {fetchApplicationById} from "../../../src/actions/actions";
import styles from "./applicationId.module.css"
import {getServerSession} from "next-auth";
import {authOptions} from "../../api/auth/[...nextauth]/auth";
import Login from "../../../components/Login/login";

export default async function ApplicationPage({params}) {

    const pageNum = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <>
                <h2>
                    User is not authenticated.
                </h2>
                <Login></Login>
            </>
        )
    }

    const response = await fetchApplicationById(pageNum.slug)

    if (!response) {
        return (
            <div>
                Failed to fetch Application.
            </div>
        )
    }

    return (
        <div className={styles.appContainer}>
            <h2>{response.name}</h2>
            <label>Description: </label><p>{response.description}</p>
            <label>Team Id:</label><p>{response.teamId}</p>
            <label>Project Id:</label><p>{response.projectId}</p>
            <img className={styles.img} alt="Application image" src={"/file.svg"}/>
        </div>
    )
}
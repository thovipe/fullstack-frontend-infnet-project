import styles from "./teamId.module.css"
import {getServerSession} from "next-auth";
import {authOptions} from "../../api/auth/[...nextauth]/auth";
import {fetchTeamById} from "../../../src/actions/actions";
import Login from "../../../components/Login/login";

export default async function teamPage({params}) {
    const numPage = await params;

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

    const team = await fetchTeamById(numPage.slug);

    if (!team) {
        return (
            <div>
                Failed to fetch team.
            </div>
        )
    }

    return (
        <div className={styles.appContainer}>
            <h2>{team.name}</h2>
            <label>Description: </label><p>{team.description}</p>
            <label>Team MemberIds:</label><p>{team.memberIds}</p>
            <img className={styles.img} alt="Team image" src={"/file.svg"}/>
        </div>
    )
}
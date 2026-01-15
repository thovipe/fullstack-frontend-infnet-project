import {authOptions} from "../api/auth/[...nextauth]/auth";
import {fetchTeams} from "../../src/actions/actions";
import styles from "./teams.module.css"
import TeamCard from "../../components/TeamCard";
import {getServerSession} from "next-auth";

export default async function teams() {

    const session = await getServerSession(authOptions);
    if (!session) {
        throw (new Error('User is not authenticated'));
    }

    try {
      const data = await fetchTeams(session)
        return (
            <div>
                <div className={styles.teamsFormContainer}>
                    <h3 className={styles.title}>Teams Catalog</h3>
                    <div className={styles.teamsCardContainer}>
                    {data.content.map((item) => (
                            <div key={item.id}>
                                <TeamCard title={item.name} description={item.description} imageUrl={"/file.svg"} id={item.id} item={item} buttonTitle={"Edit Team"} />
                            </div>
                    ))}
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        throw error;
    }

}
import Input from "../../components/Input";
import {authOptions} from "../api/auth/[...nextauth]/auth";
import {getServerSession} from "next-auth";
import Login from '../../components/Login/login'
import styles from "./projects.module.css";
import {fetchProjects} from "../../src/actions/actions";
import ProjectCard from "../../components/ProjectCard";

export default async function projects() {

    const session = await getServerSession(authOptions)

    if (session) {
        const data = await fetchProjects();

        return (
            <div>
                <div className={styles.projectFormContainer}>
                    <h3 className={styles.title}>Projects Catalog</h3>
                    <div className={styles.cardContainer}>
                        {data.content.map((item) => (
                            <div key={item.id}>
                                <ProjectCard title={item.name} description={item.description} imageUrl={"/file.svg"} id={item.id} item={item} buttonTitle={"Edit Project"}></ProjectCard>
                            </div>
                        ))}
                    </div>
                </div>
                <section>
                    <h3>Search Applications</h3>
                    <Input placeholder="Search Applications"/>
                    <button>Search Applications</button>
                </section>

            </div>
        );
    } else {
        return (
            <>
                <h2>
                    You are not logged in!
                </h2>
                <Login>Click here to login</Login>
            </>
        );
    }
}



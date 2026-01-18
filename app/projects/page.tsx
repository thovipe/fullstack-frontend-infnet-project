import Input from "../../components/Input";
import {authOptions} from "../api/auth/[...nextauth]/auth";
import {getServerSession} from "next-auth";
import Login from '../../components/Login/login'
import styles from "./projects.module.css";
import {fetchProjects} from "../../src/actions/actions";
import ProjectCard from "../../components/ProjectCard";
import {PaginationComponent} from "../../components/Pagination";

export default async function projects({searchParams,}: { searchParams?: { page?: string }; }) {

    const session = await getServerSession(authOptions)
    const params = await searchParams;

    const currentPage = Number(params?.page) || 1;
    const limit = 10;

    if (session) {
        const data = await fetchProjects(currentPage, limit);
        const totalPages = Number(data.page.totalPages);
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
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages}></PaginationComponent>
                </section>

            </div>
        );
    } else {
        return (
            <>
                <h2>
                    User is not authenticated.
                </h2>
                <Login></Login>
            </>
        );
    }
}



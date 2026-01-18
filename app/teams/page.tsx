import {authOptions} from "../api/auth/[...nextauth]/auth";
import {fetchTeams} from "../../src/actions/actions";
import styles from "./teams.module.css"
import TeamCard from "../../components/TeamCard";
import {getServerSession} from "next-auth";
import {PaginationComponent} from "../../components/Pagination";
import Login from "../../components/Login/login.tsx";

export default async function teams({searchParams,}: { searchParams?: { page?: string }; }) {

    const session = await getServerSession(authOptions);
    const params = await searchParams;

    const currentPage = Number(params?.page) || 1;
    const limit = 10;

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

    try {
      const data = await fetchTeams(session, currentPage, limit);
      const totalPages = Number(data.page.totalPages);

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
                <section>
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages}></PaginationComponent>
                </section>
            </div>
        )
    } catch (error) {
        throw error;
    }

}
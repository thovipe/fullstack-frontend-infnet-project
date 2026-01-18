import Input from "../../components/Input";
import {authOptions} from "../api/auth/[...nextauth]/auth";
import {getServerSession} from "next-auth";
import Login from '../../components/Login/login'
import Card from "../../components/Card";
import "./applications.modules.css"
import {fetchApplications, deleteApplication} from "./actions.ts"
import {PaginationComponent} from "../../components/Pagination";
import {fetchApplication} from "../../src/actions/actions.tsx";


export default async function applications({searchParams,}: { searchParams?: { page?: string }; }) {

    const session = await getServerSession(authOptions)
    const params = await searchParams;

    const currentPage = Number(params?.page) || 1;
    const limit = 10;

    if (session) {

        const data = await fetchApplication(currentPage, limit);

        const totalPages = data.page.totalPages;
        return (
            <div>

                <div className="applicationFormContainer">
                    <h3 className="title">Application Catalog</h3>

                    <div className="cardContainer">
                        {data.content.map((item) => (
                            <div key={item.id}>
                                <Card title={item.name} description={item.description} imageUrl={"/file.svg"}
                                      id={item.id} item={item} buttonTitle={"Edit App"}></Card>
                            </div>
                        ))}
                    </div>
                </div>
                <section>
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages}/>
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



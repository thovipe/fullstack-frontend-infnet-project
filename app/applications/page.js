import Input from "../../components/Input";
import {authOptions} from "../api/auth/[...nextauth]/auth";
import {getServerSession} from "next-auth";
import Login from '../../components/Login/login'
import Card from "../../components/Card";
import "./applications.modules.css"
import {fetchApplications, deleteApplication} from "./actions.ts"

export default async function applications() {

    const session = await getServerSession(authOptions)


    if (session) {
        const data = await fetchApplications();

        return (
            <div>

                <div className="applicationFormContainer">
                    <h3 className="title">Application Catalog</h3>

                    <div className="cardContainer">
                        {data.content.map((item) => (
                            <div key={item.id}>
                                <Card title={item.name} description={item.description} imageUrl={"/file.svg"} id={item.id} item={item} buttonTitle={"Edit App"}></Card>
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



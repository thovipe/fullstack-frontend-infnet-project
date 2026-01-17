import {PaginationComponent} from "../../components/Pagination";
import {getServerSession} from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/auth";


export default async function Page({searchParams,}: {searchParams?: {page?: string};}) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <h3>User is not authenticated.</h3>
        )
    }

    const params = await searchParams;

    const currentPage = Number(params?.page)||1;
    const limit = 10;

    const apiPage = currentPage - 1;

    const HTTP_URI = `${process.env.HTTP_API_URI}`+'/api/applications?page='+apiPage+'&size='+limit;

    const response = await fetch(HTTP_URI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`
        }
    })

    const data = await response.json();

    const totalPages = data.page.totalPages;

    return (
        <div style={{paddingTop:"10px",paddingBottom:"10px",paddingLeft:"10px", marginTop:"300px", color:"black"}}>
            {data.content.map((app)=> (
                <div key={app.id}>{JSON.stringify(app)}</div>
            ))}
            <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
        </div>
    )
}
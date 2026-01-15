'use server';

import { revalidatePath } from "next/cache";
import {getServerSession} from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/auth";

export async function fetchApplications() {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw ("User is not authenticated");
    }

    if(session) {
        try {
            const response = await fetch(
                "http://localhost:8080/api/applications", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session.accessToken}`
                    },
                    cache: 'no-store'
                }
            )
            console.log(response.status)
            if (response.ok) {
                return response.json();
            } else {
                return [];
            }

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}

export async function deleteApplication(formData: FormData) {

    const applicationId = formData.get("id");

    const session = await getServerSession(authOptions)

    try {
        const response = await fetch(
            `${process.env.HTTP_API_URI}/api/applications/${applicationId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                }
            }
        )
        revalidatePath("/applications")
        if (response.status === 204) {
            console.log("Deleted application");
            return "Deleted";
        }
    } catch (err) {
        throw err;
    }
}
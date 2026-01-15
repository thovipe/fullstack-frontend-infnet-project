'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export async function formSubmit(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        throw new Error('User not authenticated');
    }

    const application = {
        name: formData.get('name'),
        description: formData.get('description'),
        appTeamId: formData.get('appTeamId'),
        projectId: formData.get('projectId')
    };

    const response = await fetch("http://localhost:8080/api/applications", {
        method: 'POST',
        body: JSON.stringify(application),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
}
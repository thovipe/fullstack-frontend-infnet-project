'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/auth";
import {revalidatePath} from "next/cache";

export async function createApp(prevState: any, formData: FormData) {
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

    console.log(application);

    const response = await fetch("http://localhost:8080/api/applications", {
        method: 'POST',
        body: JSON.stringify(application),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`
        }
    });

    revalidatePath('/');

    if (response.ok) {
        return { success: true, message: `Application created successfully.` };
    } else {
        return { success: false, message: `Failed to create application.` };
    }
}

export async function updateApplication(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        throw new Error('User not authenticated');
    }

    const application = {
        id: formData.get('id'),
        name: formData.get('name'),
        description: formData.get('description'),
        appTeamId: formData.get('appTeamId'),
        projectId: formData.get('projectId')
    }

    console.log(application);

    const response = await fetch(`http://localhost:8080/api/applications/${application.id}`, {
        method: 'PUT',
        body: JSON.stringify(application),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`
        }
    })
    if (!response.ok) {
        throw (`API request failed: ${response.statusText}`);
    }
    revalidatePath('/');
    return await response.json();
}
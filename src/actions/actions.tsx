'use server';

import {AuthOptions, getServerSession} from "next-auth";
import {authOptions} from "../../app/api/auth/[...nextauth]/auth";
import {revalidatePath} from "next/cache";
import {JWT} from "next-auth/jwt";
import {isNumber} from "@motionone/utils";

export async function createProject(prevState: any, formData: FormData) {

    const session = await getServerSession(authOptions);

    if (!session) {
        throw (new Error('Failed to create project'));
    }

    const project = {
        name: formData.get('name'),
        description: formData.get('description'),
        ownerName: formData.get('ownerName')
    }

    try {
        const response = await fetch("http://localhost:8080/api/projects",
            {
                method: 'POST',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`
                }
            }
        )
        if (response.ok) {
            return { success: true, message: `Project created successfully.` };
        } else {
            return { success: false, message: `Failed to create project.` };
        }

    } catch (err) {
        throw err;
    }
}

export async function createTeam(prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions);

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/appteams';

    if (!session) {
        throw (new Error('User is not authenticated'));
    }

    const processFormInput = () => {
        const stringArray = formData.get("memberIds");
        return stringArray.toString().split(',');
    }

    const numArray = processFormInput();


    const team = {
        name: formData.get('name'),
        description: formData.get('description'),
        memberIds: numArray,
    }

    try {
        const response = await fetch(HTTP_URI,
            {
                method: 'POST',
                body: JSON.stringify(team),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`
                }
            })
        if (response.ok) {
            return { success: true, message: `Team created successfully.` };
        } else {
            return { success: false, message: `Failed to create team.` };
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchProjects() {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw (new Error('User is not authenticated'));
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/projects';
    try {
        const response = await fetch(HTTP_URI, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`
                }
            }
        )
        if (!response.ok) {
            console.log('Error fetching projects.');
        }
        return await response.json();
    } catch (err) {
        throw err;
    }
}

export async function deleteProject(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw (new Error('User is not authenticated'));
    }
    const projectId = formData.get('id');

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/projects/' + `${projectId}`;
    try {
        const response = await fetch(HTTP_URI, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        if (!response.ok) {
            console.log('Error deleting project');
        }
        revalidatePath("/projects");
        return response.status;
    } catch (err) {
        throw err;
    }
}

export async function updateProject(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw (new Error('User is not authenticated'));
    }

    const project = {
        id: formData.get('id'),
        name: formData.get('name'),
        description: formData.get('description'),
        ownerName: formData.get('ownerName')
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/projects/' + `${project.id}`;

    try {
        const response = await fetch(HTTP_URI, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        if (!response.ok) {
            console.log('Error deleting project');
        }
        revalidatePath("/projects");
        return await response.json();
    } catch (err) {
        throw err;
    }
}

export async function fetchTeams(session: JWT) {

    if (!session) {
        throw (new Error('User is not authenticated'));
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/appteams';

    try {
        const response = await fetch(HTTP_URI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        if (!response.ok) {
            return { success: false, message: `Failed on fetching teams.` };
        }
        if (response.ok) {
            return response.json();
        }
    } catch (err) {
        throw err;
    }
}

export async function deleteTeam(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw (new Error('User is not authenticated'));
    }
    const teamId = formData.get('id');

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/appteams/' + `${teamId}`;

    try {
        const response = await fetch(HTTP_URI, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        revalidatePath("/teams");
        if (!response.ok) {
            return { success: false, message: `Failed to delete team.` };
        }
        if (response.ok) {
            return { success: true, message: `Team deleted successfully.` };
        }
    }catch(err) {
        throw err;
    }
}

export async function updateTeam(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw (new Error('User is not authenticated'));
    }
    const teamId = formData.get('id');
    const processFormInput = () => {
        const stringArray = formData.get("memberIds");
        const test = stringArray.toString().split(',');
        return test.filter(item => !isNumber(item.trim()));
    }

    const numArray = processFormInput();

    const team = {
        id: teamId,
        name: formData.get('name'),
        description: formData.get('description'),
        memberIds: numArray
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/appteams/' + `${teamId}`;

    try {
        const response = await fetch(HTTP_URI, {
            method: 'PUT',
            body: JSON.stringify(team),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        revalidatePath("/teams");
        if (!response.ok) {
            return { success: false, message: `Failed to update team.` };
        }
        if (response.ok) {
            return { success: true, message: `Team updated successfully.` };
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchApplicationById(id: number) {

    const session = await getServerSession(authOptions);
    if (!session) {

        return (
            <div>
                <h3> User is not authenticated </h3>
            </div>
            )
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/applications/' + `${id}`;


    try {
        const application = await fetch(HTTP_URI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })

        return await application.json();
    } catch (err) {
        const message = `Error fetching application id: ${id}`
        console.log(err);
        return (
          <div>
              <h3>{message}</h3>
          </div>
        )
    }
}

export async function fetchProjectsById(id: number) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div>
                <h3> User is not authenticated </h3>
            </div>
        )
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/projects/' + `${id}`;

    try {
        const projects = await fetch(HTTP_URI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        return await projects.json();
    } catch (err) {
        const message = `Error fetching projects id: ${id}`
        console.log(message);
    }
}

export async function fetchTeamById(id: number) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div>
                <h3> User is not authenticated </h3>
            </div>
        )
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/appteams/' + `${id}`;

    try {
        const team = await fetch(HTTP_URI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        return await team.json();
    } catch (err) {
        const message = `Error fetching team id: ${id}`
        console.log(message);
    }
}

export async function searchDoc(prevState, formData: FormData) {

    console.log(formData);

    const searchText = formData.get('search');

    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div>
                <h3> User is not authenticated </h3>
            </div>
        )
    }

    const HTTP_URI = `${process.env.HTTP_API_URI}` + '/api/search?searchText=' + `${searchText}`

    try {
        const response = await fetch(HTTP_URI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            }
        })

        console.log(response)
        revalidatePath("/");
        return await response.json();
    } catch (err) {
        console.log(err);
        return (
            <div>
                <h3>An error has occur while searching</h3>
            </div>
        )
    }
}
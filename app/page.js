'use client';

import "./home.modules.css"
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/auth'
import {useActionState} from "react";
import {useSession} from 'next-auth/react'
import Login from '../components/Login/login'
import Logout from '../components/Logout/logout'
import ApplicationForm from "../components/ApplicationForm";
import ProjectForm from "../components/ProjectForm";
import TeamForm from "../components/TeamForm";
import {createApp} from "../components/ApplicationForm/actions";

export default function Home() {

    const {data: session, status} = useSession();



    if(status === 'loading') {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }


    const items = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'Application name'
        },
        {
            name: 'description',
            type: 'text',
            placeholder: 'Application description'
        },
        {
            name: 'appTeamId',
            type: 'number',
            placeholder: 'Application team Id'
        },
        {
            name: 'projectId',
            type: 'number',
            placeholder: 'Project Id'
        }
    ]

    const projectItems = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'Project name'
        },
        {
            name: 'description',
            type: 'text',
            placeholder: 'Project description'
        },
        {
            name: 'ownerName',
            type: 'text',
            placeholder: 'Project owner'
        }
    ]

    const teamsItems = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'Team name'
        },
        {
            name: 'description',
            type: 'text',
            placeholder: 'Team description'
        },
        {
            name: 'memberIds',
            type: 'text',
            placeholder: 'List of members Id, comma separated'
        }
    ]

    if (session) {
        return <div>
            <div>Your name is {session.user?.name}</div>
            <div><Logout /></div>
            <div className="forms-container">
                <div className="form-wrapper">
                    <ApplicationForm items={items} buttonTitle={"Create Application"} />
                </div>
                <div className="form-wrapper">
                    <ProjectForm items={projectItems} buttonTitle={"Create Project"} />
                </div>
                <div className="form-wrapper">
                    <TeamForm items={teamsItems} buttonTitle={"Create Team"} />
                </div>
            </div>
        </div>
    }

  return (
      <>
      <div className="bgHome" >   </div>
       <div className="homeContainer">
        <h1>Home</h1>
        <Login />
      </div>
      </>
  );
}




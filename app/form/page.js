import {formSubmit} from "./actions";

export default function formPage() {

    return (
        <>
            <form action={formSubmit} className="max-w-sm mx-auto">

             <label htmlFor="Name">Name</label>
                <input id="name" name="name" type="text" placeholder="Enter your application name" />
             <label htmlFor="Description">Description</label>
                <input id="description" name="description" type="text" placeholder="Enter your application description" />
             <label htmlFor={"Application Team Id"} >Application Team Id</label>
                <input id="appTeamId" name="appTeamId" type="number" placeholder="Enter team id or teamId" />
             <label htmlFor={"Project Team Id"} >Project Id</label>
                <input id="projectId" name="projectId" type="number" placeholder="Enter team id or teamId" />
                <button type="submit">Submit</button>
            </form>
        </>
    )


}

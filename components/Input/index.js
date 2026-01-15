import "./input.modules.css"

export default function Input(props) {
    return (
        <div>
            <input className="inputComponent" type={props.type} name={props.name} id={props.name} placeholder={props.placeholder}/>
        </div>
    );
}


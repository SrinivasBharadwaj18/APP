// The signup page is going to have a div with margin auto, with 50%  size of the page. 
// in side the div we are going to put a background image , sooo you put that to the div with the class signup card
// inside the div are going to have a form which is going to be a component which we are going to render in here
//you also want the label and the input element to be block so they dont sit beside each other
// the form is going to have input compnents so you dont have to repeat code . you are just going to pass the props to the input cmponent to render the component .
// it is going to have a submit button 

import { Link } from "react-router-dom";
import Form from "../components/Form";


export default function Login(){
    return(
        <div className="Page">
        <div className="card">
        <header>
            <h1>Login</h1>
        </header>
            <Form />
        </div>
        <footer>
            <p>
                <Link to={"/signup"}>signup</Link>
            </p>
        </footer>

    </div>
    )
}
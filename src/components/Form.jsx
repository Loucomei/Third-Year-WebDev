import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";

const Form = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const changeFirstName = (e) => {
        console.log(` before .. ${firstname}`)
        setFirstname(e.target.value);
        console.log(` after .. ${firstname}`)
    };

    const changeLastName = (e) => {
        console.log(` before .. ${firstname}`)
        setLastname(e.target.value);
        console.log(` after .. ${firstname}`)
    };

    const changeEmail = (e) => {
        setEmail(e.target.value);
        console.log(validator.isEmail(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);
        console.log(entries)
        document.getElementById("form").reset();
        toast.success("Form has been submitted")
    }


    return (
        <div className="newsForm">
            <p>Subscribe to our newsletter</p>
            <form onSubmit={handleSubmit} id="form">
                {firstname
                    ?<p>Number of characters = {firstname.length}</p>
                    :<p></p>
                }
                <label htmlFor="firstname">First name:
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        onChange={changeFirstName}
                > </input>
                </label>
                {lastname
                    ?<p>Number of characters = {lastname.length}</p>
                    :<p></p>
                }                
                <label htmlFor="lastname">Last name:
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        onChange={changeLastName}
                    />
                </label>
                {validator.isEmail(email) ? <p>Email is valid</p> :<p>Email is not valid</p>
                }                
                <label htmlFor="email">Email:
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={changeEmail}
                    />
                </label>
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}
export default Form;
import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import axios from "axios";

const REGISTER_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_REGISTRATION_URL
    : import.meta.env.VITE_PRODUCTION_REGISTRATION_URL;
const Form = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const changeFirstName = (e) => {
    setFirstname(e.target.value);
  };

  const changeLastName = (e) => {
    setLastname(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const entries = Object.fromEntries(data);
    document.getElementById("form").reset();
    axios
      .post(REGISTER_URL, entries, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resetAllFields();
        toast.success("Form has been submitted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="newsForm">
      <p>Subscribe to our newsletter</p>
      <form onSubmit={handleSubmit} id="form">
        {firstname ? <p>Number of characters = {firstname.length}</p> : <p></p>}
        <label htmlFor="firstname">
          First name:
          <input
            type="text"
            id="firstname"
            name="firstname"
            onChange={changeFirstName}
          >
            {" "}
          </input>
        </label>
        {lastname ? <p>Number of characters = {lastname.length}</p> : <p></p>}
        <label htmlFor="lastname">
          Last name:
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={changeLastName}
          />
        </label>
        {validator.isEmail(email) ? (
          <p>Email is valid</p>
        ) : (
          <p>Email is not valid</p>
        )}
        <label htmlFor="email">
          Email:
          <input type="email" id="email" name="email" onChange={changeEmail} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default Form;

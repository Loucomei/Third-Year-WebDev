import { FormInput, SubmitButton } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const REGISTER_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_REGISTRATION_URL
    : import.meta.env.VITE_PRODUCTION_REGISTRATION_URL;

//sends a request to the backend to register a new user
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post(REGISTER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("account created successfully!");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "Please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const RegisterPage = () => {
  return (
    <div className="form bg-base-100">
      <Form
        method="POST"
        className="p-8 bg-base-100 flex flex-col gap-y-4"
        id="register"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          label="username"
          type="text"
          name="username"
          defaultValue="Name"
        />
        <FormInput
          label="email"
          type="email"
          name="email"
          defaultValue="Email"
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          defaultValue="Password"
        />
        <SubmitButton text="Register" form="register" />
      </Form>
      <p className="text-center">
        Already a member?{" "}
        <Link to="/login" className="ml-2 link-accent">
          Login
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;

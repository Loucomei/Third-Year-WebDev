import { FormInput, SubmitButton } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loginUser } from "../features/appUsers/appUserSlice";

const LOGIN_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_LOGIN_URL
    : import.meta.env.VITE_PRODUCTION_LOGIN_URL;

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await axios.post(LOGIN_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      store.dispatch(loginUser(response.data));
      toast.success("Login success");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";
      console.log(error);
      toast.error(errorMessage);
      return null;
    }
  };

  const LoginPage = () => {
    return (
        <div className="form bg-base-100">
                <Form method="POST" className="p-8 bg-base-100 flex flex-col gap-y-4" id="login">
                    <h4 className="text-center text-3xl font-bold">
                        Login
                    </h4>
                    <FormInput
                        label="username"
                        type="name"
                        name="identifier"
                        defaultValue="Username or Email "
                    />
                    <FormInput
                        label="password"
                        type="password"
                        name="password"
                        defaultValue="Password"
                    />
                    <SubmitButton text="Login" form="login"/>
                </Form>
                <p className="text-center">
                    Not a member?{" "}
                    <Link to="/register" className="ml-2 link-accent">
                        Register
                    </Link>
                </p>
        </div>
        
    )
}
export default LoginPage;

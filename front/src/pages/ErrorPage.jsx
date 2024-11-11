import { Link, useRouteError } from "react-router-dom";

import notFound from "../assets/404.svg";
import other from "../assets/otherError.svg";

const ErrorPage = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <div className="Error">
        <img src={notFound} alt="404" />
        <h4> The requested link could not be found!</h4>
        <Link to="/">Back to Home Page</Link>
      </div>
    );
  }
  return (
    <div className="Error">
      <img src={other} alt="unknownError" />
      <h4> Unknown error occured.</h4>
      <Link to="/">Back to Home Page</Link>
    </div>
  );
};

export default ErrorPage;

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import UserContainer from "./UserContainer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/appUsers/appUserSlice";

const NavBar = () => {

  const user = useSelector((state) => state.appUsers.user)

  //console.log(user)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    console.log("logout");
    dispatch(logoutUser());
    navigate("/");
  }

  const login = () => {
    console.log("login");
    navigate("/login")
  }

  const register = () => {
    console.log("login");
    navigate("/register")
  }

    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><NavLink to="/">Home </NavLink></li>
        <li>
          <a>Store</a>
          <ul className="p-2">
            <li><NavLink to="/books">Books </NavLink></li>
            <li><NavLink to="/newsletter">News </NavLink></li>
          </ul>
        </li>
        {
          user ? (
            <>
              <li><NavLink to="/settings">Settings </NavLink></li>
              <li><button onClick={logout}>Sign Out</button></li>
            </>
          ):(
            <>
              <li><NavLink to="/login">Login </NavLink></li>
              <li><NavLink to="/register">Register </NavLink></li>
            </>
          )
        }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">FinalOffer</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><NavLink to="/">Home </NavLink></li>
      <li>
        <details>
          <summary>Store</summary>
          <ul className="p-2">
            <li><NavLink to="/books">Books </NavLink></li>
            <li><NavLink to="/newsletter">News </NavLink></li>
          </ul>
        </details>
      </li>
      {
          user ? (
            <>
              <li><NavLink to="/settings">Settings </NavLink></li>
              <li><button onClick={logout}>Sign Out</button></li>
            </>
          ):(
            <>
              <li><NavLink to="/login">Login </NavLink></li>
              <li><NavLink to="/register">Register </NavLink></li>
            </>
          )
        }
    </ul>
  </div>
  <div className="navbar-end">
    {
      (useLocation().pathname == '/register' || useLocation().pathname == '/login') ? (
        <>
        Social links here
        </>
      ) : (
        <UserContainer user={user} logout={logout} login={login} register={register} />
      )
    }
  </div>
</div>
    )
}

export default NavBar
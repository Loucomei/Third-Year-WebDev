import { NavLink, useNavigate, useLocation } from "react-router-dom";
import UserContainer from "./UserContainer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/appUsers/appUserSlice";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("appUser"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

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
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home </NavLink>
            </li>
            <li>
              <a>Account</a>
              <ul className="p-2">
                {user ? (
                  <>
                    <li>
                      <NavLink to="/settings">Settings </NavLink>
                    </li>
                    <li>
                      <button onClick={logout}>Sign Out</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login">Login </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register">Register </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
        <button className="btn btn-ghost text-xl">
          <NavLink to="/">FinalOffer</NavLink>
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home </NavLink>
          </li>
          {user ? (
            <ul>
              <li>
                <NavLink to="/settings">Settings </NavLink>
              </li>
              <li>
                <button onClick={logout}>Sign Out</button>
              </li>
            </ul>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login </NavLink>
              </li>
              <li>
                <NavLink to="/register">Register </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <input
          type="checkbox"
          value="dark"
          className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
        />
        {useLocation().pathname == "/register" ||
        useLocation().pathname == "/login" ? (
          <></>
        ) : (
          <UserContainer
            user={user}
            logout={logout}
            login={login}
            register={register}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;

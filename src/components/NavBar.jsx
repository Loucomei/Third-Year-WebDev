import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="NavBar">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/books">Login</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default NavBar
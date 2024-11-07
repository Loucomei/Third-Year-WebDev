import { Link } from "react-router-dom";
const UserContainer = ( props ) => {
    const { user, login, logout, register } = props
    return (
        <ul className="logins">
        {
            user ? (
                <li>
                    {"Hi "}
                    {user?.username?.toUpperCase()}
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src={user?.picture} />
                        </div>
                    </div>
                </li>
            ) : (
                <li>
                {" Please "}
                <button
                className="btn bg-slate-200"
                onClick={login}>
                    login
                </button>
                <button
                className="btn bg-slate-200"
                onClick={register}>
                    register
                </button>
                </li>
            )
        }
        </ul>
    )
}
export default UserContainer;
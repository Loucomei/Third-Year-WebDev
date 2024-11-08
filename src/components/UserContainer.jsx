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
                <>
                </>
            )
        }
        </ul>
    )
}
export default UserContainer;
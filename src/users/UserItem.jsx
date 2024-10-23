import UserPhoto from "./UserPhoto";

const UserItem = ({ user, remove }) => {
    const { email, login, location, name, picture } = user;

    return (
        <div className="users">
            <div className="user">
            <UserPhoto
                picture={picture.large}
                name={name}
            />
            <h3>
                {name.first + " "}
                {name.last}
            </h3>
            <p>
                {email}
            </p>
            <h4>
                {location.city +", "}
                {location.country}
            </h4>
            <button onClick={() => remove(login.uuid)}>
                remove
            </button>
            </div>
        </div>
    )
}

export default UserItem;
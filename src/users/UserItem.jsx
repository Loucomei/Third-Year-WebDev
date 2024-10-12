import UserPhoto from "./UserPhoto";

const UserItem = ({ user }) => {
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
            </div>
        </div>
    )
}

export default UserItem;
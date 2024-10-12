import { useEffect, useState } from "react";
const URL = "https://randomuser.me/api/?results=10";
import axios from "axios";
import { toast } from "react-toastify";
import UserItem from "./UserItem";

const Users = () => {
    const [randomUsers, setRandomUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchUsers = () => {
        axios
        .get(URL)
        .then((response) => {
            console.log(response);
            setIsLoading(false);
            setRandomUsers(response.data.results)
        })
        .catch((error) =>{
            return toast.error(error.response.data);
            // return console.log(error, response);
        })
    }
    useEffect(() => {
        fetchUsers();
    }, []);
    if (isLoading) {
        return (
            <div>
                <h4>
                    IsLoading
                </h4>
            </div>
        )
    }
    return (
        <section>
            <h2>Users</h2>
            <div>
                {randomUsers.map((user) => {
                    return <UserItem user={user} key={user.login.uuid}/>;
                })}
            </div>
        </section>
    )
}

export default Users;
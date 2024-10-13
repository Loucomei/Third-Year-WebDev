import { useEffect, useState } from "react";
const URL = "https://randomuser.me/api/?results=10";
import axios from "axios";
import { toast } from "react-toastify";
import UserItem from "./UserItem";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { fetchUsers, clearList, removeUser } from "../features/users/userSlice.js";

const Users = () => {

    const { randomUsers, isLoading } = useSelector((store) => store.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleClearList = () => {
        dispatch(clearList());
    }

    const refillList = () => {
        dispatch(fetchUsers());
    }

    const remove = (id) => {
        dispatch(removeUser(id));
    }
 
    if (isLoading) {
        return (
            <h4>
                Loading data
            </h4>
        )
    }

    return (
        <section>
            <h2>Users</h2>
            {randomUsers.length > 0
                ? (
                    <div>
                        <button onClick={handleClearList}>
                            clear all
                        </button>
                        {randomUsers.map((user) => {
                            return <UserItem user={user} key={user.login.uuid} remove={remove} />;
                        })}
                    </div>
                )
                : (
                    <button onClick={refillList}>
                        reset
                    </button>
                )
            }
        </section>
    )
}

export default Users;
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    user: null
};

const appUserSlice = createSlice({
    name: "appUser",
    initialState,
    reducers: {
        loginUser: ( state,  action) => {
            const user = {...action.payload.user, token: action.payload.jwt};
            state.user = user;
            localStorage.setItem("appUser", JSON.stringify(user));
            //console.log("login");
        },
        logoutUser: (state) => {
            state.user = null;
            //console.log("logout");
            localStorage.removeItem("appUser");
            toast.success("You have logged out! ");
        },
        getUser: (state) => {
            state.user = localStorage.getItem("appUser")
        }
    },
});

export const { loginUser, logoutUser } = appUserSlice.actions;

export default appUserSlice.reducer;

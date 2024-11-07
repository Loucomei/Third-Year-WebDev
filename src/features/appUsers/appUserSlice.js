import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  user: null,
};

const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      Cookies.set("appUser", JSON.stringify(user), { expires: 1 }); // Expires in 1 day
    },
    logoutUser: (state) => {
      state.user = null;
      Cookies.remove("appUser");
      toast.success("You have logged out!");
    },
    getUser: (state) => {
      const user = Cookies.get("appUser");
      state.user = user ? JSON.parse(user) : null;
    },
  },
});

export const { loginUser, logoutUser, getUser } = appUserSlice.actions;
export default appUserSlice.reducer;

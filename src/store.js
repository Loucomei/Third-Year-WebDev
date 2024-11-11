import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./features/items/itemSlice";
import appUserReducer from "./features/appUsers/appUserSlice.js";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    appUsers: appUserReducer,
  },
});

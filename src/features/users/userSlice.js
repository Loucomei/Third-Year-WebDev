import { createSlice,createAsyncThunk, isAction } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://randomuser.me/api/?results=10";

const initialState = {
    randomUsers: [],
    isLoading: true,
}

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(URL);
            return response.data.results;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearList: (state) => {
            state.randomUsers = [];
        },
        removeUser: (state, action) => {
            const uuid = action.payload;
            state.randomUsers = state.randomUsers.filter(
                (user) => user.login.uuid !== uuid
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            console.log(state);
            console.log(action.payload);
            state.isLoading = false;
            state.randomUsers = action.payload;
            console.log(state.randomUsers.length);
        });
        builder.addCase(fetchUsers.rejected, (state) => {
            state.isLoading = false;
        });
    }
})

//console.log(userSlice)

export const { clearList, removeUser } = userSlice.actions;

export default userSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://fakestoreapi.com/products";
const filter = "All"


const initialState = {
  randomItems: [],
  isLoading: true,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const changeFilter = createAsyncThunk(
  "items/changeFilter",
  async (name, thunkAPI) => {
    try {
      console.log(filter)
      const response = await axios.get(URL);
      const data = response.data
      const newResponse =  data.filter((item) => {
        return item.category.toLowerCase().includes(filter);
      });
      console.log(newResponse);
      return newResponse;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearList: (state) => {
      state.randomItems = [];
    },
    removeUser: (state, action) => {
      const id = action.payload;
      state.randomItems = state.randomItems.filter((item) => item.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.randomItems = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
      state.isLoading = false;
      })
  },
});

export const { clearList } = itemSlice.actions;
export const { removeUser } = itemSlice.actions;
export default itemSlice.reducer;

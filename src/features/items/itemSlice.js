import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://fakestoreapi.com/products";

const initialState = {
  randomItems: [],
  isLoading: true,
  itemsFound: false,
  categoryFilter: "All",
  nameFilter: "",
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
    setItemsFound: (state) => {
      state.itemsFound = !state.itemsFound;
    },
    setCategoryFilter: (state, action) =>{
      const filter = action.payload;
      state.categoryFilter = filter;
    },
    setNameFilter: (state, action) => {
      const filter = action.payload;
      state.nameFilter = filter;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsFound = true;
        state.randomItems = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
      state.isLoading = false;
      })
  },
});
export const {
  clearList,
  removeUser,
  setItemsFound,
  setCategoryFilter,
  setNameFilter
} = itemSlice.actions;
export default itemSlice.reducer;

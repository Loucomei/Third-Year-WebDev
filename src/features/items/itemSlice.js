import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://fakestoreapi.com/products";

const ALLITEMS_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_ITEMS_URL
    : import.meta.env.VITE_PRODUCTION_ITEMS_URL;

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
      const responseDB = await fetch(ALLITEMS_URL);
      const data = await responseDB.json();
      response.data.forEach((item) => {
        data.forEach((bidItem) => {
          if (item.id == bidItem.item_id) {
            item.price = bidItem.price;
          }
        });
      });
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
    setCategoryFilter: (state, action) => {
      const filter = action.payload;
      state.categoryFilter = filter;
    },
    setNameFilter: (state, action) => {
      const filter = action.payload;
      state.nameFilter = filter;
    },
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
      });
  },
});
export const {
  clearList,
  removeUser,
  setItemsFound,
  setCategoryFilter,
  setNameFilter,
} = itemSlice.actions;
export default itemSlice.reducer;

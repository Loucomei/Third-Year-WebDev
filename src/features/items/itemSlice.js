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
  timers: [],
  once: false,
};

const createTimers = (randomItems) => {
  var timers = [];
  for (const item in randomItems) {
    // 1. Get current time in seconds
    // 2. Generate random time between 21hours and 1hour
    // 3. Return nearest whole number sum of 1. and 2.
    const randomTime = () => {
      const seconds = new Date().getTime() / 1000;
      const time = Math.random() * 60 * 60 * 20 + 3600;
      return Math.round(time + seconds);
    };
    timers = [...timers, randomTime()];
  }
  return timers;
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(URL);
      const responseDB = await fetch(URL);
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
    setTimer: (state) => {
      state.timePassed += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.once = true;
        state.itemsFound = true;
        state.randomItems = action.payload;
        console.log(JSON.parse(localStorage.getItem("timers")) == null);
        if (localStorage.getItem("timers" == null)) {
          state.timers = createTimers(state.randomItems);
          localStorage.setItem("timers", JSON.stringify(state.timers));
        }
        state.isLoading = false;
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
  setTimer,
} = itemSlice.actions;
export default itemSlice.reducer;

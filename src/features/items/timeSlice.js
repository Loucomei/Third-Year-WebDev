import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timePassed: 0,
    auctionCompleted: false,
};

const timeSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incrementTime: (state) => {
      state.timePassed = state.timePassed + 1;
    },
    setAuctionComplete: (state) => {
      state.auctionCompleted = true;
    },
  },
});
export const {
    incrementTime,
    auctionComplete
} = timeSlice.actions;
export default timeSlice.reducer;

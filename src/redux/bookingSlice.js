import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    selectedCar: null,
    bookings: [],
  },
  reducers: {
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setSelectedCar, setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
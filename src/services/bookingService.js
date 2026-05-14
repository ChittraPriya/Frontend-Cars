import instance from "../instances/instance";

// CREATE BOOKING
export const createBooking = async (bookingData) => {
  const res = await instance.post("/bookings/create", bookingData);
  return res.data;
};

// GET USER BOOKINGS (uses token)
export const getUserBookings = async () => {
  const res = await instance.get("/bookings");
  return res.data;
};

// GET CAR BY ID
export const getCarById = async (id) => {
  const res = await instance.get(`/cars/${id}`);
  return res.data;
};

// CANCEL BOOKING
export const cancelBooking = async (id) => {
  const res = await instance.put(`/bookings/${id}/cancel`);
  return res.data;
};
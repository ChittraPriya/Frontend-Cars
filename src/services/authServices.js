import instance from "../instances/instance";

// REGISTER (no cookie needed usually)
export const registerUser = async (userData) => {
  const response = await instance.post("/auth/register", userData);
  return response.data;
};

// LOGIN (sets cookie)
export const loginUser = async (userData) => {
  const response = await instance.post("/auth/login", userData);
  return response.data;
};

// GET LOGGED IN USER
export const getMe = async () => {
  const response = await instance.get("/auth/getme"); // ✅ FIXED
  return response.data;
};

// LOGOUT
export const logoutUser = async () => {
  const response = await instance.post("/auth/logout");
  return response.data;
};
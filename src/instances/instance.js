import axios from "axios";

const instance = axios.create({
  baseURL:"https://carbooking-3jga.onrender.com/api/v1",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
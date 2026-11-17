
import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:4000/api",
  withCredentials: true,
  timeout: 15000,
});

export const getError = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Something went wrong";
import axios from "axios";

const configuredUrl = (
  import.meta.env.VITE_API_URL?.trim() ||
  import.meta.env.VITE_BACKEND_URL?.trim() ||
  (import.meta.env.DEV ? "http://localhost:4000" : "")
).replace(/\/+$/, "");

export const api = axios.create({
  baseURL: configuredUrl.endsWith("/api") ? configuredUrl : `${configuredUrl}/api`,
  withCredentials: true,
  timeout: 15000,
});

export const getError = (error) =>
  error.response?.data?.message ||
  (error.code === "ERR_NETWORK" && "Could not reach the server. Check your connection and try again.") ||
  error.message ||
  "Something went wrong";

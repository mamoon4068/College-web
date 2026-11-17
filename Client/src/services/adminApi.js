import axios from "axios";

const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:4000/api")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const adminApi = axios.create({
  baseURL: apiBase,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginAdmin = async (email, password) => {
  const response = await adminApi.post("/api/admin/login", { email, password });
  return response.data;
};

export default adminApi;

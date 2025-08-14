import axios from "axios";

const API_BASE = import.meta.env.PROD
  ? "https://kambaz.onrender.com"
  : "http://localhost:4000";

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,            // <-- REQUIRED for cookies
});

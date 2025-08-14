import axios from "axios";

const API_BASE = import.meta.env.PROD
  ? "https://kambaz.onrender.com"
  : "http://localhost:4000";

console.log("✅ API Base URL:", API_BASE);

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

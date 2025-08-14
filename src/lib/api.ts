// src/lib/api.ts
import axios from "axios";

export const SERVER =
  import.meta.env.PROD
    ? "https://kambaz.onrender.com"
    : "http://localhost:4000";

console.log("✅ API Base URL:", SERVER);

export const api = axios.create({
  baseURL: `${SERVER}/api`,
  withCredentials: true,
});

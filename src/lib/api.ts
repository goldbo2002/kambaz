// src/lib/api.ts
import axios from "axios";

export const SERVER =
  import.meta.env.VITE_HTTP_SERVER || "http://localhost:4000";

console.log("✅ API Base URL:", SERVER);

export const api = axios.create({
  baseURL: SERVER + "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

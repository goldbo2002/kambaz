// src/lib/api.ts
import axios from "axios";

export const SERVER = import.meta.env.VITE_HTTP_SERVER || "https://kambaz.onrender.com";
console.log("✅ API Base URL:", SERVER); // DEBUG

export const api = axios.create({
  baseURL: SERVER + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

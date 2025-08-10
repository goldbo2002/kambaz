// src/Kambaz/Account/api.ts
import axios from "axios";
export const SERVER = import.meta.env.VITE_HTTP_SERVER || "http://localhost:4000";
export const api = axios.create({
  baseURL: SERVER + "/api",
  withCredentials: true // end cookies on every request
});


import axios from "axios";

export const SERVER = import.meta.env.VITE_HTTP_SERVER;


export const api = axios.create({
  baseURL: SERVER + "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

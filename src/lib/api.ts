import axios from "axios";

const API_BASE = import.meta.env.PROD
  ? "https://kambaz.onrender.com/api"
  : "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

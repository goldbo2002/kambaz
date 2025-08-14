import session from "express-session";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.set("trust proxy", 1); // FIRST

app.use(cors({
  origin: ["http://localhost:5173", "https://<your-netlify-site>.netlify.app"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: true,
  },
}));

import userRoutes from "./routes/users.js";
app.use("/api/users", userRoutes);

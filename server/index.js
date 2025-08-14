import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://silly-melba-c04293.netlify.app"
  ],
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: true,
  },
}));


app.get("/api/health", (req, res) => res.json({ ok: true }));

import userRoutes from "./routes/users.js"; // adjust path if needed
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
app.set("trust proxy", 1); // Add this line

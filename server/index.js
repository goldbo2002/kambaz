console.log("1)    Starting server initialization");

import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";


dotenv.config();
console.log("2)    Environment variables loaded");

const app = express();
console.log("3)    Express app created");

app.set("trust proxy", 1);
console.log("4)    trust proxy set");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://silly-melba-c04293.netlify.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("6)    Body parsers enabled");

if (!process.env.SESSION_SECRET) {
  console.error("⚠️ SESSION_SECRET not set!");
} else {
  console.log("7)    SESSION_SECRET is set");
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: true,
  },
}));
console.log("8)    Session middleware applied");

// Import routes
import userRoutes from "./routes/users.js";
console.log("9)    userRoutes imported");

app.use("/api/users", userRoutes);
console.log("10)   Routes mounted");

app.get("/api/debug/session", (req, res) => {
  console.log("11)   debug endpoint hit", { cookies: req.headers.cookie, session: req.session });
  res.json({ cookies: req.headers.cookie, session: req.session, user: req.session?.user });
});
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ API listening on ${PORT}`);
});
// Global error handler for Express
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err.stack || err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

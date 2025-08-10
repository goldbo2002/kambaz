// server/server.js
import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import usersRouter from "./routes/users.js";
import coursesRouter from "./routes/courses.js";
import enrollmentsRouter from "./routes/enrollments.js";
import assignmentsRouter from "./routes/assignments.js";
import modulesRouter from "./routes/modules.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// ✅ Required on Render so secure cookies work behind the proxy
app.set("trust proxy", 1);

// ✅ CORS: allow your Netlify origin & credentials
app.use(cors({
  origin: CLIENT_URL,       // e.g. https://silly-melba-c04293.netlify.app
  credentials: true
}));

app.use(express.json());

// ✅ Session: secure cookie in prod so it persists across refreshes
app.use(session({
  secret: process.env.SESSION_SECRET || "dev_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,                          // true on Render (HTTPS)
    maxAge: 1000 * 60 * 60 * 24 * 7          // 7 days
  }
}));

// --- MongoDB connection ---
const uri = process.env.DATABASE_CONNECTION_STRING;
if (!uri) {
  console.error("Missing DATABASE_CONNECTION_STRING in env");
  process.exit(1);
}
mongoose.connect(uri)
  .then(() => console.log("✅ Mongo connected"))
  .catch(err => {
    console.error("❌ Mongo connection error", err);
    process.exit(1);
  });

// --- Health check ---
app.get("/api/health", (req, res) => res.json({ ok: true }));

// --- API routes ---
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/enrollments", enrollmentsRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/modules", modulesRouter);

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

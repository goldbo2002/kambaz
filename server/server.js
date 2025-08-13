import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";

// Routes
import usersRoutes from "./users.js";
import coursesRoutes from "./courses.js";
import modulesRoutes from "./modules.js";
import assignmentsRoutes from "./assignments.js";

mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/kambaz");

const app = express();

//fix cors i hope
app.use(cors({
  origin: [
    "http://localhost:5173",                           // local dev
    "https://silly-melba-c04293.netlify.app"           // deployed frontend
  ],
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/modules", modulesRoutes);
app.use("/api/assignments", assignmentsRoutes);

// Test route
app.post("/api/ping", (req, res) => {
  res.send({ ok: true, body: req.body, ts: Date.now() });
});

app.get("/api/health", (req, res) => {
  res.send({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Kambaz server listening on :${PORT}`);
});

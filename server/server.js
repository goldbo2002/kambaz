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
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "dev_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false // set true if behind https with proper proxy
  }
}));

// DB connect
const uri = process.env.DATABASE_CONNECTION_STRING;
if (!uri) {
  console.error("Missing DATABASE_CONNECTION_STRING in env");
  process.exit(1);
}
mongoose.connect(uri).then(() => {
  console.log("✅ Mongo connected");
}).catch(err => {
  console.error("❌ Mongo connection error", err);
  process.exit(1);
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/enrollments", enrollmentsRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/modules", modulesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

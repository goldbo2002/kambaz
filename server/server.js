import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import users from "./users.js";
import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";

dotenv.config();

const app = express();
const FRONTEND_URL = "https://silly-melba-c04293.netlify.app"; 

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,          // required for cross-site cookies
    sameSite: "none"       
  }
}));

app.use("/api/users", users);
app.use("/api/courses", courses);
app.use("/api/modules", modules);
app.use("/api/assignments", assignments);

// Ping endpoint for debugging
app.post("/api/ping", (req, res) => {
  res.send({
    ok: true,
    body: req.body,
    ts: Date.now()
  });
});

app.get("/api/health", (req, res) => {
  res.send({ ok: true });
});

const CONNECTION_STRING = process.env.DB || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING).then(() => {
  console.log("✅ Mongo connected");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Kambaz server listening on :${PORT}`);
});

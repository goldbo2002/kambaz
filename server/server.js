import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import "dotenv/config";

// Import routes
import usersRoutes from "./routes/users.js";
import coursesRoutes from "./routes/courses.js";
import modulesRoutes from "./routes/modules.js";
import assignmentsRoutes from "./routes/assignments.js";

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://silly-melba-c04293.netlify.app"
];

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboardcat",
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/ping", (req, res) => {
  res.json({ ok: true, body: req.body, ts: Date.now() });
});

app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/modules", modulesRoutes);
app.use("/api/assignments", assignmentsRoutes);

// Mongo connection + start server
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Kambaz server listening on :${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

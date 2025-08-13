// server/index.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");

// --- Routes
const usersRoutes = require("./routes/users");
const coursesRoutes = require("./routes/courses");
const modulesRoutes = require("./routes/modules");
const assignmentsRoutes = require("./routes/assignments");

const app = express();

// --- Env
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "dev-secret";
const MONGO_URI = process.env.DATABASE_CONNECTION_STRING;
(async () => {
  console.log(`[BOOT] FRONTEND_URL = ${FRONTEND_URL}`);
  console.log(`[BOOT] PORT = ${PORT}`);
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`🚀 Kambaz server listening on :${PORT}`);
    console.log(`CORS origin: ${FRONTEND_URL}`);
  });
})();

// --- Trust proxy so secure cookies work on Render/Cloudflare
app.set("trust proxy", 1);

// --- CORS (must be before routes/sessions)
const corsOpts = { origin: FRONTEND_URL, credentials: true };
app.use(cors(corsOpts));
app.options("*", cors(corsOpts)); // preflights

// --- Body parser (must be before routes)
app.use(express.json());

// --- Session (cross-site cookie for Netlify -> Render)
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none", // required for cross-site
      secure: true,     // required on HTTPS
      httpOnly: true,
    },
  })
);

// --- Health/ping
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.post("/api/ping", (req, res) =>
  res.json({ ok: true, body: req.body, ts: Date.now() })
);

// --- API routes
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/modules", modulesRoutes);
app.use("/api/assignments", assignmentsRoutes);

// --- 404 + error handler
app.use((req, res) => res.status(404).json({ message: "Not found" }));
app.use((err, _req, res, _next) => {
  console.error("[ERROR]", err);
  res.status(500).json({ message: err?.message || "Server error" });
});

// --- DB connect (fast-fail) + always start server
const connectMongo = async () => {
  if (!MONGO_URI) {
    console.error("❌ Missing DATABASE_CONNECTION_STRING env var");
    return;
  }
  console.log("⏳ Connecting to MongoDB…");
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10s so deploys don't hang
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err?.message || err);
  }
};

(async () => {
  console.log(`[BOOT] FRONTEND_URL = ${FRONTEND_URL}`);
  console.log(`[BOOT] PORT = ${PORT}`);
  await connectMongo(); // try DB, but start server regardless
  app.listen(PORT, () => {
    console.log(`🚀 Kambaz server listening on :${PORT}`);
    console.log(`CORS origin: ${FRONTEND_URL}`);
  });
})();

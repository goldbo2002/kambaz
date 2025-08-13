// server/index.js
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// --- Env
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "dev-secret";
const MONGO_URI = process.env.DATABASE_CONNECTION_STRING;

// --- Trust proxy so secure cookies work on Render/Cloudflare
app.set("trust proxy", 1);

// --- CORS (must be before routes/sessions)
const corsOpts = { origin: FRONTEND_URL, credentials: true };
app.use(cors(corsOpts));
app.options("*", cors(corsOpts)); // preflights

// --- Body parser (must be before routes)
app.use(express.json());

// --- Session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: "none", secure: true, httpOnly: true },
}));

// --- Health/ping
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.post("/api/ping", (req, res) => res.json({ ok: true, body: req.body, ts: Date.now() }));

// --- Runtime diagnostics
app.get("/api/_routes", (_req, res) => {
  const dump = [];
  const stack = app._router?.stack || [];
  stack.forEach((layer) => {
    if (layer.route && layer.route.path) {
      const methods = Object.keys(layer.route.methods).join(",");
      dump.push({ type: "route", path: layer.route.path, methods });
    } else if (layer.name === "router" && layer.regexp) {
      dump.push({ type: "router", prefix: layer.regexp.toString() });
    }
  });
  res.json(dump);
});
app.get("/api/_fs", (_req, res) => {
  const routesDir = path.join(__dirname, "routes");
  let list = [];
  try { list = fs.readdirSync(routesDir); } catch (e) { /* ignore */ }
  res.json({ __dirname, routesDir, list });
});

// --- Import and mount users router with robust logging
let usersRoutes;
let resolvedUsers;
try {
  resolvedUsers = require.resolve("./routes/users"); // exact file path Node loads
  // If you renamed the file to users.routes.js, switch to "./routes/users.routes"
  usersRoutes = require("./routes/users");
  console.log("[MOUNT] users router resolved to:", resolvedUsers);
} catch (e) {
  console.error("❌ Failed to resolve/require './routes/users':", e.message);
}

// Small prefix logger so we know if the prefix gets hit at all
function prefixLogger(req, _res, next) {
  console.log(`[HIT] /api/users prefix: ${req.method} ${req.originalUrl}`);
  next();
}

if (usersRoutes) {
  app.use("/api/users", prefixLogger, usersRoutes);
} else {
  console.error("❌ usersRoutes is undefined, not mounting /api/users");
}

// --- Other API routes (keep your other mounts here)
try {
  const coursesRoutes = require("./routes/courses");
  app.use("/api/courses", coursesRoutes);
} catch (e) { console.error("courses mount error:", e.message); }

try {
  const modulesRoutes = require("./routes/modules");
  app.use("/api/modules", modulesRoutes);
} catch (e) { console.error("modules mount error:", e.message); }

try {
  const assignmentsRoutes = require("./routes/assignments");
  app.use("/api/assignments", assignmentsRoutes);
} catch (e) { console.error("assignments mount error:", e.message); }

app.use('/api/users', require('./routes/users'));

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
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err?.message || err);
  }
};

(async () => {
  console.log(`[BOOT] FRONTEND_URL = ${FRONTEND_URL}`);
  console.log(`[BOOT] PORT = ${PORT}`);
  // Show what's in routes dir
  try {
    const routesDir = path.join(__dirname, "routes");
    console.log("[BOOT] routes dir:", routesDir, fs.readdirSync(routesDir));
  } catch (e) {
    console.log("[BOOT] routes dir read error:", e.message);
  }
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`🚀 Kambaz server listening on :${PORT}`);
    console.log(`CORS origin: ${FRONTEND_URL}`);
  });
})();

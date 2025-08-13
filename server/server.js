const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users");
const coursesRoutes = require("./routes/courses");
const modulesRoutes = require("./routes/modules");
const assignmentsRoutes = require("./routes/assignments");
const Course = require("./models/Course");

const app = express();

//  DEBUG
app.use((req, res, next) => {
  console.log("🔥 Request Origin:", req.headers.origin);
  next();
});

// CORS 
const allowedOrigins = [
  "http://localhost:5173",
  "https://silly-melba-c04293.netlify.app"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
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

// routes
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

// connect and start
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

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://silly-melba-c04293.netlify.app"
];

// Handle CORS preflight requests
app.options("*", cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// CORS config
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "keyboardcat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: true
  }
}));

// Routes
require("./routes/users")(app);
require("./routes/courses")(app);
require("./routes/assignments")(app);
require("./routes/modules")(app);
require("./routes/enrollments")(app);
require("./routes/labs")(app);

// Connect to MongoDB and start server
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/kambaz";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Kambaz server listening on :${PORT}`);
  });
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

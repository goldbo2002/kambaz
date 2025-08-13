import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courses.js";
import moduleRoutes from "./routes/modules.js";
import assignmentRoutes from "./routes/assignments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: [
    "http://localhost:5173",                     // local dev
    "https://silly-melba-c04293.netlify.app"     // your real Netlify domain
  ],
  credentials: true
}));


// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboardcat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),

    cookie: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  })
);

// DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Mongo connected"))
  .catch((err) => console.error("Mongo error →", err));

// Routes
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/ping", (req, res) => {
  res.json({ ok: true, body: req.body, ts: Date.now() });
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/assignments", assignmentRoutes);

// start
app.listen(PORT, () => {
  console.log(`🚀 Kambaz server listening on :${PORT}`);
  console.log("CORS origin:", "https://silly-melba-c04293.netlify.app");
});

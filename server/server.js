import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import "dotenv/config";

import UsersRoutes from "./routes/users.js";
import CoursesRoutes from "./routes/courses.js";
import ModulesRoutes from "./routes/modules.js";
import AssignmentsRoutes from "./routes/assignments.js";

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.set("trust proxy", 1);
app.use(session({
  secret: "secret", resave: false, saveUninitialized: false,
  cookie: { secure: false } // set to true in prod with HTTPS
}));

app.get("/api/health", (_, res) => res.json({ ok: true }));
app.post("/api/ping", (req, res) => res.json({ ok: true, body: req.body, ts: Date.now() }));

UsersRoutes(app);
CoursesRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Kambaz server listening on :${PORT}`);
    });
  });

import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import modulesRouter from "./routes/modules.js";
import assignmentsRouter from "./routes/assignments.js";
import coursesRouter from "./routes/courses.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL, // e.g. Netlify URL
  ],
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  },
}));

app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/users", usersRouter);
app.use("/api/courses/:cid/modules", modulesRouter);
app.use("/api/courses/:cid/assignments", assignmentsRouter);
app.use("/api/courses", coursesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));

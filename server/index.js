import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import users from "./routes/users.js";
import courses from "./routes/courses.js";
import modules from "./routes/modules.js";
import assignments from "./routes/assignments.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1); // required for secure cookies on Render

app.use(cors({
  origin: ["http://localhost:5173", "https://silly-melba-c04293.netlify.app"],
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboard",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));
app.use("/api/users", usersRouter);
app.use("/api/courses", courses);
app.use("/api/modules", modules);
app.use("/api/assignments", assignments);

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected"));


app.get('/', (req, res) => res.sendStatus(200));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

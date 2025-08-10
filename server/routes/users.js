import express from "express";
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: { type: String, enum: ["STUDENT", "FACULTY", "ADMIN"], default: "STUDENT" }
  },
  { collection: "users" }
);

const Users = mongoose.model("users", schema);
const router = express.Router();

const isProd = process.env.NODE_ENV === "production";
const COOKIE_NAME = "connect.sid";
const CLEAR_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
  path: "/",
};

// ---------- Auth ----------
router.post("/signup", async (req, res) => {
  try {
    const { username } = req.body || {};
    if (!username) return res.status(400).json({ message: "username required" });
    const exists = await Users.findOne({ username });
    if (exists) return res.status(409).json({ message: "Username already taken" });
    const user = await Users.create(req.body);
    req.session.currentUser = user;      // keep logged in
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Missing credentials" });
  const user = await Users.findOne({ username, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  req.session.currentUser = user;        // keep logged in
  res.json(user);
});

router.post("/signout", (req, res) => {
  // destroy session then clear cookie on client
  req.session.destroy(() => {
    res.clearCookie(COOKIE_NAME, CLEAR_COOKIE_OPTS);
    res.sendStatus(200);
  });
});

router.get("/current", (req, res) => {
  const user = req.session?.currentUser;
  if (!user) return res.sendStatus(401); // <-- IMPORTANT
  res.json(user);
});

// ---------- Users CRUD ----------
router.get("/", async (req, res) => {
  const q = {};
  if (req.query.role) q.role = req.query.role;
  if (req.query.name) {
    const re = new RegExp(req.query.name, "i");
    q.$or = [{ firstName: re }, { lastName: re }, { username: re }, { email: re }];
  }
  const users = await Users.find(q);
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await Users.create(req.body);
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Users.updateOne({ _id: id }, { $set: req.body });
  const updated = await Users.findById(id);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Users.deleteOne({ _id: id });
  res.sendStatus(200);
});

export default router;

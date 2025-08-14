import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, username, firstName, lastName });
    res.status(201).json({ message: "User created", user });
  } catch (e) {
    next(e);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const ok = user && (await bcrypt.compare(password, user.password));
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    req.session.user = user._id;
    res.json({ message: "Signed in", user });
  } catch (e) {
    next(e);
  }
});

router.get("/profile", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
  res.json({ userId: req.session.user });
});

router.post("/signout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Signout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Signed out" });
  });
});

export default router;

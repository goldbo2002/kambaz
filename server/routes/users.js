const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }
    const user = await User.create({ username, password });
    req.session.user = { _id: user._id, username: user.username };
    res.status(201).json({ message: "signup successful", user: req.session.user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Username already taken" });
    }
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }
    const user = await User.findOne({ username, password }).lean();
    if (!user) return res.status(401).json({ message: "invalid credentials" });
    req.session.user = { _id: user._id, username: user.username };
    res.json({ message: "signin successful", user: req.session.user });
  } catch (err) {
    next(err);
  }
});

router.post("/signout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "signed out" });
  });
});

router.get("/me", (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: "not signed in" });
  }
  res.json({ user: req.session.user });
});

module.exports = router;

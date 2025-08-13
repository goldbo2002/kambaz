
const express = require("express");
const User = require("../models/User");

const router = express.Router();

//sign up
router.post("/signup", async (req, res, next) => {
  try {
    console.log("[SIGNUP] headers:", req.headers);
    console.log("[SIGNUP] body:", req.body);

    const { username, email, password, role, firstName, lastName } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, and password are required" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "USER",
      firstName,
      lastName,
    });

    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json(req.session.user);
  } catch (err) {
    return next(err);
  }
});

//sign in
router.post("/signin", async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};
    if ((!username && !email) || !password) {
      return res.status(400).json({ message: "username or email AND password are required" });
    }

    const query = username ? { username } : { email };
    const user = await User.findOne(query);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json(req.session.user);
  } catch (err) {
    next(err);
  }
});

//signout
router.post("/signout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ message: "Signed out" });
  });
});


router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not signed in" });
  }
  res.json(req.session.user);
});

router.get("/_version", (_req, res) => {
  res.json({ signupRouteAcceptsEmail: true });
});

module.exports = router;

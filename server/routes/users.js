import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import User from "../models/User.js"; // or adjust the path

// probe to confirm the router is mounted
router.get("/ping", (_req, res) => res.json({ ok: true, who: "users-router" }));


router.post("/signup", async (req, res, next) => {
  try {
    console.log("Signup payload:", req.body);

    if (!req.body.username || !req.body.password) {
      console.warn("Signup missing required fields:", req.body);
      return res.status(400).json({ message: "username and password required" });
    }

    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ username: req.body.username, password: hashed });
    req.session.user = { _id: user._id, username: user.username };
    console.log("Session user set:", req.session.user);

    req.session.save((err) => {
      if (err) {
        console.error("Session save failed:", err);
        return next(err);
      }
      console.log("Signup success, responding with session user");
      res.status(201).json(req.session.user);
    });
  } catch (err) {
    console.error("Signup handler error:", err);
    next(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const newUser = new User(req.body);  // ✅ Make sure it's req.body
  await newUser.save();


    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid username or password" });

    // Save session
    req.session.user = {
      _id: user._id,
      username: user.username,
    };

    res.json(req.session.user);
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Signin failed" });
  }
});

router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not signed in" });
  res.json(req.session.user);
});

router.get("/profile", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not signed in" });
  res.json(req.session.user);
});
router.post("/signout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

export default router;


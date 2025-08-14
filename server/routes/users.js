import express from "express";
const router = express.Router();
import User from "../models/User.js"; // or adjust the path

// probe to confirm the router is mounted
router.get("/ping", (_req, res) => res.json({ ok: true, who: "users-router" }));


const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash, username });

    await user.save();
    res.status(201).send({ message: "User created", user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Error signing up");
  }
});



router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Invalid email or password");

    req.session.user = user._id;
    res.status(200).send({ message: "Signed in", user });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).send("Internal Server Error");
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


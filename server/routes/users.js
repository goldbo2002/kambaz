import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import User from "../models/User.js"; // or adjust the path

// probe to confirm the router is mounted
router.get("/ping", (_req, res) => res.json({ ok: true, who: "users-router" }));


router.post("/signup", async (req, res) => {
  try {
    console.log("📨 Signup request body:", req.body); // <== ADD THIS HERE

    const newUser = new User(req.body); // Make sure you're passing the full req.body
    await newUser.save();

    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json({ message: "User created", user: req.session.user });
  } catch (err) {
    console.error("❌ Signup error:", err); // <== LOG THE FULL ERROR
    res.status(500).json({ message: "Signup failed", error: err.message });
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


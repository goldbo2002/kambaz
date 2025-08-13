// SIGNUP
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

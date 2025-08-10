import { Router } from "express";
import * as dao from "../dao/users.js";

const router = Router();

// auth helpers
const setSession = (req, user) => { req.session.currentUser = { 
  _id: user._id.toString(),
  username: user.username,
  role: user.role,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
}; };

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await dao.findByUsername(username);
  if (!user || user.password !== password) return res.status(401).json({ message: "Invalid credentials" });
  setSession(req, user);
  res.json(req.session.currentUser);
});

router.post("/signup", async (req, res) => {
  const exists = await dao.findByUsername(req.body.username);
  if (exists) return res.status(409).json({ message: "Username already exists" });
  const user = await dao.createOne(req.body);
  setSession(req, user);
  res.status(201).json(req.session.currentUser);
});

router.post("/signout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get("/current", (req, res) => {
  res.json(req.session.currentUser || null);
});

// query users
router.get("/", async (req, res) => {
  const { role, name } = req.query;
  if (role) return res.json(await dao.findByRole(role));
  if (name) return res.json(await dao.searchByName(name));
  res.json(await dao.findAll());
});

router.get("/:id", async (req, res) => {
  const u = await dao.findById(req.params.id);
  if (!u) return res.sendStatus(404);
  res.json(u);
});

router.post("/", async (req, res) => {
  const created = await dao.createOne(req.body);
  res.status(201).json(created);
});

router.put("/:id", async (req, res) => {
  const updated = await dao.updateOne(req.params.id, req.body);
  if (!updated) return res.sendStatus(404);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const removed = await dao.removeOne(req.params.id);
  if (!removed) return res.sendStatus(404);
  res.json({ ok: true });
});

export default router;

import { Router } from "express";
import Module from "../models/Module.js";
const router = Router();

router.use((req, res, next) => {
  if (!req.session?.currentUser) return res.status(401).json({ message: "Not signed in" });
  next();
});

// Create
router.post("/", async (req, res, next) => {
  try {
    const courseId = req.body.courseId || req.body.course;
    const doc = await Module.create({ title: req.body.title, course: courseId });
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

// List by course
router.get("/course/:cid", async (req, res, next) => {
  try { res.json(await Module.find({ course: req.params.cid })); }
  catch (e) { next(e); }
});

// Update title
router.put("/:mid", async (req, res, next) => {
  try {
    await Module.updateOne({ _id: req.params.mid }, { $set: { title: req.body.title } });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Delete
router.delete("/:mid", async (req, res, next) => {
  try {
    await Module.deleteOne({ _id: req.params.mid });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;

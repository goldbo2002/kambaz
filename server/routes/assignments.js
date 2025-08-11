import { Router } from "express";
import Assignment from "../models/assignment.js";
const router = Router();

router.use((req, res, next) => {
  if (!req.session?.currentUser) return res.status(401).json({ message: "Not signed in" });
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const courseId = req.body.courseId || req.body.course;
    const doc = await Assignment.create({
      title: req.body.title,
      points: req.body.points ?? 100,
      dueDate: req.body.dueDate ?? new Date(),
      course: courseId
    });
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

router.get("/course/:cid", async (req, res, next) => {
  try { res.json(await Assignment.find({ course: req.params.cid })); }
  catch (e) { next(e); }
});

router.put("/:aid", async (req, res, next) => {
  try {
    const $set = {};
    if (req.body.title !== undefined) $set.title = req.body.title;
    if (req.body.points !== undefined) $set.points = req.body.points;
    if (req.body.dueDate !== undefined) $set.dueDate = req.body.dueDate;
    await Assignment.updateOne({ _id: req.params.aid }, { $set });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:aid", async (req, res, next) => {
  try { await Assignment.deleteOne({ _id: req.params.aid }); res.json({ ok: true }); }
  catch (e) { next(e); }
});

export default router;

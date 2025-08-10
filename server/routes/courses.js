import { Router } from "express";
import * as dao from "../dao/courses.js";
import * as enrollments from "../dao/enrollments.js";

const router = Router();

router.get("/", async (req, res) => res.json(await dao.findAll()));
router.get("/:cid", async (req, res) => {
  const c = await dao.findById(req.params.cid);
  if (!c) return res.sendStatus(404);
  res.json(c);
});

router.post("/", async (req, res) => {
  // auto-enroll creator if logged in
  const created = await dao.createOne(req.body);
  if (req.session.currentUser) {
    try { await enrollments.enroll(req.session.currentUser._id, created._id); } catch {}
  }
  res.status(201).json(created);
});

router.put("/:cid", async (req, res) => {
  const updated = await dao.updateOne(req.params.cid, req.body);
  if (!updated) return res.sendStatus(404);
  res.json(updated);
});

router.delete("/:cid", async (req, res) => {
  const removed = await dao.removeOne(req.params.cid);
  if (!removed) return res.sendStatus(404);
  res.json({ ok: true });
});

// people in a course
router.get("/:cid/users", async (req, res) => {
  const list = await enrollments.findCourseUsers(req.params.cid);
  res.json(list.map(e => e.user));
});

export default router;

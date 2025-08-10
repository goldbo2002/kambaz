import { Router } from "express";
import * as dao from "../dao/enrollments.js";

const router = Router();

// current user's courses
router.get("/me", async (req, res) => {
  if (!req.session.currentUser) return res.status(401).json({ message: "Not signed in" });
  const list = await dao.findUserCourses(req.session.currentUser._id);
  res.json(list.map(e => e.course));
});

// enroll/unenroll
router.post("/:uid/courses/:cid", async (req, res) => {
  await dao.enroll(req.params.uid, req.params.cid);
  res.status(201).json({ ok: true });
});

router.delete("/:uid/courses/:cid", async (req, res) => {
  await dao.unenroll(req.params.uid, req.params.cid);
  res.json({ ok: true });
});

export default router;

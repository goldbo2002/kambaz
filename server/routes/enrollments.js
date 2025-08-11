// server/routes/enrollments.js
import { Router } from "express";
import * as dao from "../dao/enrollments.js";

const router = Router();

// Small wrapper so async errors go to Express error middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/enrollments/me  -> current user's courses
router.get(
  "/me",
  asyncHandler(async (req, res) => {
    if (!req.session?.currentUser) {
      return res.status(401).json({ message: "Not signed in" });
    }
    const list = await dao.findUserCourses(req.session.currentUser._id);
    res.json(list.map((e) => e.course));
  })
);

// POST /api/enrollments/:uid/courses/:cid  -> enroll
router.post(
  "/:uid/courses/:cid",
  asyncHandler(async (req, res) => {
    // Optional safety: require session and match user
    if (!req.session?.currentUser) {
      return res.status(401).json({ message: "Not signed in" });
    }
    const { uid, cid } = req.params;


    try {
      await dao.enroll(uid, cid);
      return res.status(201).json({ ok: true });
    } catch (err) {
      // Handle duplicate key 
      if (err && err.code === 11000) {
        return res.json({ ok: true, alreadyEnrolled: true });
      }
      throw err; 
    }
  })
);

// DELETE /api/enrollments/:uid/courses/:cid  -> unenroll
router.delete(
  "/:uid/courses/:cid",
  asyncHandler(async (req, res) => {
    if (!req.session?.currentUser) {
      return res.status(401).json({ message: "Not signed in" });
    }
    const { uid, cid } = req.params;
    const result = await dao.unenroll(uid, cid); // deleteOne
    // Treat not found as success 
    return res.json({ ok: true, deleted: result.deletedCount || 0 });
  })
);

export default router;

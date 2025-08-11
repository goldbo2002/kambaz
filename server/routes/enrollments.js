import { Router } from 'express';
import * as dao from '../dao/enrollments.js';

const router = Router();

// current user's courses (returns an array of Course objects)
router.get('/me', async (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ message: 'Not signed in' });
  }
  const list = await dao.findUserCourses(req.session.currentUser._id);
  // Return just the course objects
  res.json(list.map((e) => e.course));
});

// enroll
router.post('/:uid/courses/:cid', async (req, res, next) => {
  try {
    // Optional: enforce self-only enroll
    if (!req.session.currentUser || req.session.currentUser._id !== req.params.uid) {
      // If your grading expects no auth enforcement here, comment this out.
      return res.status(401).json({ message: 'Not signed in' });
    }
    const result = await dao.enroll(req.params.uid, req.params.cid);
    // If your dao returns something indicating duplicates, reflect that
    res.status(201).json({ ok: true, alreadyEnrolled: !!result?.alreadyEnrolled });
  } catch (e) {
    next(e);
  }
});

// unenroll
router.delete('/:uid/courses/:cid', async (req, res, next) => {
  try {
    if (!req.session.currentUser || req.session.currentUser._id !== req.params.uid) {
      // If your grading expects no auth enforcement here, comment this out.
      return res.status(401).json({ message: 'Not signed in' });
    }
    const deleted = await dao.unenroll(req.params.uid, req.params.cid);
    res.json({ ok: true, deleted: Number(deleted) || 0 });
  } catch (e) {
    next(e);
  }
});

export default router;

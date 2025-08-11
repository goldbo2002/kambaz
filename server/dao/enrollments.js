import Enrollment from "../models/Enrollment.js";

// Return plain courses for a user (use populate so /me can map courses)
export async function findUserCourses(userId) {
  const rows = await Enrollment.find({ user: userId }).populate("course");
  return rows; // caller can map(e => e.course)
}

export async function enroll(userId, courseId) {
  try {
    const row = await Enrollment.create({ user: userId, course: courseId });
    return { ok: true, _id: row._id, alreadyEnrolled: false };
  } catch (e) {
    // E11000 duplicate key -> already enrolled
    if (e.code === 11000) return { ok: true, alreadyEnrolled: true };
    throw e;
  }
}

export async function unenroll(userId, courseId) {
  const res = await Enrollment.deleteOne({ user: userId, course: courseId });
  return { ok: true, deleted: res.deletedCount || 0 };
}

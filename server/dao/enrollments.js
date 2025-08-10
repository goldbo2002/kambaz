import Enrollment from "../models/Enrollment.js";
export const enroll = (userId, courseId) => Enrollment.create({ user: userId, course: courseId });
export const unenroll = (userId, courseId) => Enrollment.findOneAndDelete({ user: userId, course: courseId });
export const findUserCourses = (userId) => Enrollment.find({ user: userId }).populate("course");
export const findCourseUsers = (courseId) => Enrollment.find({ course: courseId }).populate("user");
export const isEnrolled = (userId, courseId) => Enrollment.findOne({ user: userId, course: courseId });

import Assignment from "../models/Assignment.js";
export const findByCourse = (courseId) => Assignment.find({ course: courseId }).sort({ createdAt: -1 });
export const createOne = (doc) => Assignment.create(doc);
export const updateOne = (id, doc) => Assignment.findByIdAndUpdate(id, doc, { new: true });
export const removeOne = (id) => Assignment.findByIdAndDelete(id);

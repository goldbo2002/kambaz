import Module from "../models/Module.js";
export const findByCourse = (courseId) => Module.find({ course: courseId }).sort({ createdAt: -1 });
export const createOne = (doc) => Module.create(doc);
export const updateOne = (id, doc) => Module.findByIdAndUpdate(id, doc, { new: true });
export const removeOne = (id) => Module.findByIdAndDelete(id);

import Course from "../models/Course.js";
export const findAll = () => Course.find().sort({ createdAt: -1 });
export const findById = (id) => Course.findById(id);
export const createOne = (doc) => Course.create(doc);
export const updateOne = (id, doc) => Course.findByIdAndUpdate(id, doc, { new: true });
export const removeOne = (id) => Course.findByIdAndDelete(id);

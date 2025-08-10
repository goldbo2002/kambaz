import User from "../models/User.js";

export const findAll = (q = {}) => User.find(q).sort({ createdAt: -1 });
export const findById = (id) => User.findById(id);
export const findByUsername = (username) => User.findOne({ username });
export const searchByName = (name) => {
  const rx = new RegExp(name, "i");
  return User.find({ $or: [{ firstName: rx }, { lastName: rx }, { username: rx }] });
};
export const findByRole = (role) => User.find({ role });
export const createOne = (doc) => User.create(doc);
export const updateOne = (id, doc) => User.findByIdAndUpdate(id, doc, { new: true });
export const removeOne = (id) => User.findByIdAndDelete(id);

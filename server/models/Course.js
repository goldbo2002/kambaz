import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  number: String,
  section: String,
  term: String,
  startDate: Date,
  endDate: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
export default mongoose.model("Course", schema);

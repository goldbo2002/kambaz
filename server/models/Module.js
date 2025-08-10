import mongoose from "mongoose";
const schema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true }
}, { timestamps: true });
export default mongoose.model("Module", schema);

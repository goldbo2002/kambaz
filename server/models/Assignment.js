import mongoose from "mongoose";
const schema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  points: { type: Number, default: 100 },
  dueDate: { type: Date }
}, { timestamps: true });
export default mongoose.model("Assignment", schema);

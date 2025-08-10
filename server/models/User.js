import mongoose from "mongoose";
const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain for lab simplicity
  role: { type: String, enum: ["STUDENT","FACULTY","ADMIN"], default: "STUDENT" },
  firstName: String,
  lastName: String,
  email: String
}, { timestamps: true });
export default mongoose.model("User", schema);

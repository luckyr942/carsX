import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID or custom user ID
  title: { type: String, required: true }, // Car title/name
  specs: { type: String }, // Optional description/specs
  imageUrl: { type: String, required: true }, // Uploaded image path
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Car", carSchema);

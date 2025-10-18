import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true }, // add this for JWT auth
    profilePic: {
      type: String,
      default: "https://in.pinterest.com/pin/28499410137465406/",
    },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userAuthSchema);

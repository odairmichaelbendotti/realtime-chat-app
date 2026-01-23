import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: false, default: "" },
  },
  { timestamps: true },
);

// Timestamp = updatedAt and createdAt

const User = mongoose.model("User", userSchema);

export default User;

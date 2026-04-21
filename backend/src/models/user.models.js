import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "agent"],
      default: "agent",
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);

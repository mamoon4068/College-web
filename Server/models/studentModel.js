
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      select: false
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
      select: false
    },

    facebookId: {
      type: String,
      unique: true,
      sparse: true,
      select: false
    },

    profileImage: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["student"],
      default: "student",
      immutable: true
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", studentSchema);

export default studentModel;

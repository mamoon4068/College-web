
import mongoose from "mongoose";
import Student from "Server/controllers/studentAuthController.js"
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      default: "student"
    },

    googleId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;

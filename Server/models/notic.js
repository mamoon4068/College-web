
import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    category: {
      type: String,
      required: true,
      enum: ["Academic", "Fees", "General"],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      required: true,
      enum: ["Important", "General"],
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default notice;


import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "General",
        "Examination",
        "Admission",
        "Holiday",
        "Important",
      ],
      default: "General",
    },

    published: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

noticeSchema.index({
  published: 1,
  createdAt: -1,
});

export default mongoose.model(
  "Notice",
  noticeSchema
);

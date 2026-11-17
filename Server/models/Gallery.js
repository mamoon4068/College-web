
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "School Activities",
        "Sports",
        "Celebrations",
        "Academics",
        "Campus",
      ],
      default: "School Activities",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Gallery",
  gallerySchema
);


import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      default: "School Campus",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

eventSchema.index({
  published: 1,
  date: 1,
});

export default mongoose.model(
  "Event",
  eventSchema
);

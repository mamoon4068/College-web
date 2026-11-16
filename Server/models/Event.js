
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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
      enum: ["Celebration", "Academic", "Meeting", "Sports"],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    venue: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "🎉",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;

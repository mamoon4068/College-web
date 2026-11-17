
import mongoose from "mongoose";
import Event from "../models/Event.js";

// PUBLIC EVENTS
export const getPublicEvents = async (req, res) => {
  try {
    const events = await Event.find({
      published: true,
    })
      .sort({ date: 1 })
      .limit(100);

    return res.json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// ADMIN EVENTS
export const getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .limit(200);

    return res.json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      imageUrl,
      published,
    } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof date !== "string" ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, description and date required",
      });
    }

    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      date,
      venue: venue || "School Campus",
      imageUrl: imageUrl || "",
      published: published === true,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid event data",
    });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const allowed = [
      "title",
      "description",
      "date",
      "venue",
      "imageUrl",
      "published",
    ];

    const updates = {};

    for (const key of allowed) {
      if (Object.hasOwn(req.body, key)) {
        updates[key] = req.body[key];
      }
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.json({
      success: true,
      message: "Event updated",
      event,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid event data",
    });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const event = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.json({
      success: true,
      message: "Event deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

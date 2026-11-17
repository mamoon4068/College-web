
import mongoose from "mongoose";
import Notice from "../models/Notice.js";

// PUBLIC: Published notices only
export const getPublicNotices = async (req, res) => {
  try {
    const notices = await Notice.find({
      published: true,
    })
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json({
      success: true,
      notices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};

// ADMIN: All notices including drafts
export const getAdminNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ createdAt: -1 })
      .limit(200);

    return res.json({
      success: true,
      notices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};

// CREATE NOTICE
export const createNotice = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      published,
    } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const notice = await Notice.create({
      title: title.trim(),
      description: description.trim(),
      category: category || "General",
      published: published === true,
      createdBy: req.admin._id,
    });

    return res.status(201).json({
      success: true,
      message: "Notice created",
      notice,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid notice data",
    });
  }
};

// UPDATE NOTICE
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID",
      });
    }

    const allowed = [
      "title",
      "description",
      "category",
      "published",
    ];

    const updates = {};

    for (const key of allowed) {
      if (Object.hasOwn(req.body, key)) {
        updates[key] = req.body[key];
      }
    }

    const notice = await Notice.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    return res.json({
      success: true,
      message: "Notice updated",
      notice,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid update data",
    });
  }
};

// DELETE NOTICE
export const deleteNotice = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID",
      });
    }

    const notice = await Notice.findByIdAndDelete(
      req.params.id
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    return res.json({
      success: true,
      message: "Notice deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete notice",
    });
  }
};

import mongoose from "mongoose";
import { Readable } from "node:stream";

import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// IMAGE SIGNATURE CHECK
function validImage(buffer, mimetype) {
  if (!buffer || buffer.length < 12) return false;

  if (mimetype === "image/jpeg") {
    return (
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );
  }

  if (mimetype === "image/png") {
    return buffer.subarray(0, 8).equals(
      Buffer.from([
        137, 80, 78, 71, 13, 10, 26, 10,
      ])
    );
  }

  if (mimetype === "image/webp") {
    return (
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    );
  }

  return false;
}

// CLOUDINARY UPLOAD HELPER
function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "school-website/gallery",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
}

// PUBLIC GALLERY
export const getPublicGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .select("-publicId")
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
    });
  }
};

// ADMIN GALLERY
export const getAdminGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .sort({ createdAt: -1 })
      .limit(200);

    return res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
    });
  }
};

// UPLOAD IMAGE
export const uploadGalleryImage = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const { title, category } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and image required",
      });
    }

    if (!validImage(req.file.buffer, req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file",
      });
    }

    const uploaded = await uploadToCloudinary(
      req.file.buffer
    );

    uploadedPublicId = uploaded.public_id;

    const photo = await Gallery.create({
      title: title.trim(),
      category: category || "School Activities",
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      photo,
    });
  } catch (error) {
    // Clean up uploaded image if DB save failed
    if (uploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(
          uploadedPublicId
        );
      } catch (cleanupError) {
        console.error("Image cleanup failed", cleanupError);
      }
    }

    console.error("Gallery upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

// DELETE IMAGE
export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image ID",
      });
    }

    const photo = await Gallery.findById(id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    await cloudinary.uploader.destroy(photo.publicId);

    await Gallery.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Image deleted",
    });
  } catch (error) {
    console.error("Gallery delete error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete image",
    });
  }
};

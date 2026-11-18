
import express from "express";

import { adminAuth } from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";



import {
  getPublicGallery,
  getAdminGallery,
  uploadGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getPublicGallery);

router.get(
  "/admin/all",
  adminAuth,
  getAdminGallery
);

router.post(
  "/",
  adminAuth,
  upload.single("image"),
  uploadGalleryImage
);

router.delete(
  "/:id",
  adminAuth,
  deleteGalleryImage
);

export default router;

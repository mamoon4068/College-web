
import express from "express";

import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPublicNotices,
  getAdminNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

router.get("/", getPublicNotices);

router.get(
  "/admin/all",
  adminAuth,
  getAdminNotices
);

router.post("/", adminAuth, createNotice);

router.patch("/:id", adminAuth, updateNotice);

router.delete("/:id", adminAuth, deleteNotice);

export default router;


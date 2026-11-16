
import express from "express";

import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public routes
router.get("/", getNotices);
router.get("/:id", getNoticeById);

// Admin protected routes
router.post("/", adminAuth, createNotice);
router.put("/:id", adminAuth, updateNotice);
router.delete("/:id", adminAuth, deleteNotice);

export default router;

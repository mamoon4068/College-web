
import express from "express";

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin protected routes
router.post("/", adminAuth, createEvent);
router.put("/:id", adminAuth, updateEvent);
router.delete("/:id", adminAuth, deleteEvent);

export default router;

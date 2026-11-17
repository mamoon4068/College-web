
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPublicEvents,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getPublicEvents);

router.get(
  "/admin/all",
  adminAuth,
  getAdminEvents
);

router.post("/", adminAuth, createEvent);

router.patch("/:id", adminAuth, updateEvent);

router.delete("/:id", adminAuth, deleteEvent);

export default router;


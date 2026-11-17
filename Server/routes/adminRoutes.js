
import express from "express";
import { rateLimit } from "express-rate-limit";

import {
  loginAdmin,
  getAdmin,
  logoutAdmin,
} from "../controllers/authController.js";

import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Try again later.",
  },
});

router.post("/login", loginLimiter, loginAdmin);

router.get("/me", adminAuth, getAdmin);

router.post("/logout", adminAuth, logoutAdmin);

export default router;

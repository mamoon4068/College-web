
import express from "express";
import rateLimit from "express-rate-limit";
import { adminLogin } from "../controllers/adminAuthController.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

router.post("/login", loginLimiter, adminLogin);

export default router;

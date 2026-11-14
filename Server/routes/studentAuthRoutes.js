
import express from "express";
import rateLimit from "express-rate-limit";

import {
  registerStudent,
  loginStudent,
  googleLogin,
  facebookLogin
} from "../controllers/studentAuthController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Limit repeated authentication attempts

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again later."
  }
});

// Student Registration
router.post("/register", authLimiter, registerStudent);

// Email and Password Login
router.post("/login", authLimiter, loginStudent);

// Google Login
router.post("/google", authLimiter, googleLogin);

// Facebook Login
router.post("/facebook", authLimiter, facebookLogin);

// Get Logged-in Student
router.get("/me", authMiddleware, async (req, res) => {

  res.status(200).json({
    success: true,
    message: "Student authenticated successfully",
    student: req.student
  });

});

export default router;

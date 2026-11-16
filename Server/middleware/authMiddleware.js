
import jwt from "jsonwebtoken";
import Student from "../models/student.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {

  // Get token from request header

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required"
    });
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  // Verify JWT

  try {

    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });

  }

  // Find student in database

  const student = await Student.findById(
    decoded.sub
  ).select("name email role profileImage");

  if (!student) {
    return res.status(401).json({
      success: false,
      message: "Student account not found"
    });
  }

  // Store student details in request

  req.student = student;

  next();

});

export default authMiddleware;

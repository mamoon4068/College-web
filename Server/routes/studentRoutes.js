
import express from "express";

import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Only Admin can manage student records
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createStudent
);

router.get(
  "http://localhost:5173/adminlogin",
  "http://localhost:5173/staff-login",
  protect,
  authorizeRoles("admin", "staff"),
  getStudents
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  getStudentById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateStudent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStudent
);

export default router;

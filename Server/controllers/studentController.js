import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  try {
    const { name, email, password, ...rest } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "Name, email and password are required" });
    const student = await Student.create({ ...rest, name, email, passwordHash: await bcrypt.hash(password, 12) });
    return res.status(201).json({ success: true, student });
  } catch (error) {
    return res.status(error.code === 11000 ? 409 : 400).json({ success: false, message: error.code === 11000 ? "Email already exists" : "Unable to create student" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.json({ success: true, students });
  } catch {
    return res.status(500).json({ success: false, message: "Unable to fetch students" });
  }
};

export const getStudentById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid student ID" });
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ success: false, message: "Student not found" });
  return res.json({ success: true, student });
};

export const updateStudent = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid student ID" });
  const updates = { ...req.body };
  delete updates.passwordHash;
  delete updates.role;
  const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!student) return res.status(404).json({ success: false, message: "Student not found" });
  return res.json({ success: true, student });
};

export const deleteStudent = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid student ID" });
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ success: false, message: "Student not found" });
  return res.json({ success: true, message: "Student deleted" });
};
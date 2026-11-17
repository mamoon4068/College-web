import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.adminToken ||
      (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null);

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type === "school-admin") {
      const admin = await Admin.findById(decoded.id);
      if (!admin) return res.status(401).json({ success: false, message: "Admin account not found" });
      req.admin = admin;
      req.student = admin;
    } else {
      const student = await Student.findById(decoded.sub || decoded.id);
      if (!student) return res.status(401).json({ success: false, message: "Student account not found" });
      req.student = student;
    }

    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  const user = req.admin || req.student;
  if (!user || !roles.includes(user.role)) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  return next();
};

export default protect;
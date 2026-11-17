
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

import {
  createToken,
  cookieOptions,
} from "../utils/token.js";

// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const matched = await bcrypt.compare(
      password,
      admin.password
    );

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(admin._id.toString());

    res.cookie(
      "adminToken",
      token,
      cookieOptions
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// CURRENT ADMIN
export const getAdmin = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
};

// ADMIN LOGOUT
export const logoutAdmin = async (req, res) => {
  res.clearCookie("adminToken", {
    ...cookieOptions,
    maxAge: undefined,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};


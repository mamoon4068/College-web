
import "dotenv/config";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";

async function createAdmin() {
  try {
    const name = process.env.INIT_ADMIN_NAME;
    const email = process.env.INIT_ADMIN_EMAIL;
    const password = process.env.INIT_ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error(
        "Set INIT_ADMIN_NAME, INIT_ADMIN_EMAIL and INIT_ADMIN_PASSWORD"
      );
    }

    if (password.length < 12) {
      throw new Error(
        "Admin password must be at least 12 characters"
      );
    }

    await mongoose.connect(
      process.env.MONGODB_URI
    );

    const existing = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    await Admin.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("First admin created successfully");
  } catch (error) {
    console.error("Create admin failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();

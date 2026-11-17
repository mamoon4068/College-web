import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

// Resolve Server/.env independently of the terminal's working directory.
dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)), quiet: true });

try {
  const name = (process.env.INIT_ADMIN_NAME || "School Administrator").trim();
  const email = (process.env.INIT_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const password = process.env.INIT_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  const missing = [];

  if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
    missing.push("MONGO_URI (or MONGODB_URI)");
  }
  if (!email) missing.push("INIT_ADMIN_EMAIL (or ADMIN_EMAIL)");
  if (!password) missing.push("INIT_ADMIN_PASSWORD (or ADMIN_PASSWORD)");

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  // Use the same database configuration as the backend.
  await connectDB();

  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log("Admin already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
  }
} catch (error) {
  console.error("Create admin failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

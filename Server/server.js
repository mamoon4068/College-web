
import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import studentAuthRoutes from "./routes/studentAuthRoutes.js";



import contactRoutes from "./routes/contactRoutes.js";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";


const app = express();
app.use("/api/contact", contactRoutes);
//Envornment Variable
configDotenv.config();

// json request read karne ke liye 
app.use(express.json({
  limit: "10kb"
}));

// Frontend ko backend access
app.use(cors({
  origin: process.env.CLIENT_URL
}));
//HEALTH CHECK API
app.get("/api/heath", (req, res) => {
  res.status(200).json({
    success: true
  })
})
// ======================================
// SECURITY AND MIDDLEWARE
// ======================================

app.use(helmet());

const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:5173"
)
  .split(",")
  .map(origin => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Origin not allowed by CORS"));
    },

    credentials: true
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true }));


// ======================================
// HEALTH CHECK
// ======================================

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "School Backend API is running"
  });

});


// ======================================
// STUDENT AUTHENTICATION ROUTES
// ======================================

app.use(
  "/api/student/auth",
  studentAuthRoutes
);


// ======================================
// 404 HANDLER
// ======================================

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "API route not found"
  });

});


// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use((error, req, res, next) => {

  console.error("Backend Error:", error.message);

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "This account information already exists"
    });
  }


  res.status(error.statusCode || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message
  });

});


// ======================================
// START SERVER
// ======================================

const startServer = async () => {

  try {

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);

      console.log(
        `API URL: http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error("Server Startup Failed:", error.message);
    process.exit(1);

  }

};

startServer();

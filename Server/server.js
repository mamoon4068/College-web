
import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

// Database
import connectDB from "./config/db.js";

// Routes
import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";

const app = express();

// ======================================
// SECURITY MIDDLEWARE
// ======================================

app.use(helmet());

// ======================================
// CORS CONFIGURATION
// ======================================

const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Origin not allowed by CORS")
      );
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);

// ======================================
// BODY PARSER MIDDLEWARE
// ======================================

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

// ======================================
// HOME ROUTE
// ======================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running",
  });
});

// ======================================
// HEALTH CHECK API
// ======================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
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
// CONTACT ROUTES
// ======================================

app.use(
  "/api/contact",
  contactRoutes
);

// ======================================
// SCHOOL EVENTS ROUTES
// ======================================

app.use(
  "/api/events",
  eventRoutes
);

// ======================================
// SCHOOL NOTICES ROUTES
// ======================================

app.use(
  "/api/notices",
  noticeRoutes
);

// ======================================
// 404 HANDLER
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use((error, req, res, next) => {
  console.error("Backend Error:", error.message);

  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "This account information already exists",
    });
  }

  const statusCode = error.statusCode || (
    error.message === "Origin not allowed by CORS"
      ? 403
      : 500
  );

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

// ======================================
// START SERVER
// ======================================

const startServer = async () => {
  try {
    // Environment validation
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    // Database connection
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("----------------------------------");
      console.log("School Management Backend Started");
      console.log("----------------------------------");
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log("----------------------------------");
    });

  } catch (error) {
    console.error(
      "Server Startup Failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();

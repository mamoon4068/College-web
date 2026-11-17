
// import "dotenv/config";

// import express from "express";
// import cors from "cors";
// import helmet from "helmet";

// // Database
// import connectDB from "./config/db.js";

// // Routes
// import studentAuthRoutes from "./routes/studentAuthRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import noticeRoutes from "./routes/noticeRoutes.js";

// const app = express();

// // ======================================
// // SECURITY MIDDLEWARE
// // ======================================

// app.use(helmet());

// // ======================================
// // CORS CONFIGURATION
// // ======================================

// const allowedOrigins = (
//   process.env.CLIENT_URL || "http://localhost:5173"
// )
//   .split(",")
//   .map((origin) => origin.trim());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(
//         new Error("Origin not allowed by CORS")
//       );
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//     ],
//     credentials: true,
//   })
// );

// // ======================================
// // BODY PARSER MIDDLEWARE
// // ======================================

// app.use(
//   express.json({
//     limit: "10kb",
//   })
// );

// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: "10kb",
//   })
// );

// // ======================================
// // HOME ROUTE
// // ======================================

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "School Management API is running",
//   });
// });

// // ======================================
// // HEALTH CHECK API
// // ======================================

// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is healthy",
//   });
// });

// // ======================================
// // STUDENT AUTHENTICATION ROUTES
// // ======================================

// app.use(
//   "/api/student/auth",
//   studentAuthRoutes
// );

// // ======================================
// // CONTACT ROUTES
// // ======================================

// app.use(
//   "/api/contact",
//   contactRoutes
// );

// // ======================================
// // SCHOOL EVENTS ROUTES
// // ======================================

// app.use(
//   "/api/events",
//   eventRoutes
// );

// // ======================================
// // SCHOOL NOTICES ROUTES
// // ======================================

// app.use(
//   "/api/notices",
//   noticeRoutes
// );

// // ======================================
// // 404 HANDLER
// // ======================================

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "API route not found",
//   });
// });

// // ======================================
// // GLOBAL ERROR HANDLER
// // ======================================

// app.use((error, req, res, next) => {
//   console.error("Backend Error:", error.message);

//   if (res.headersSent) {
//     return next(error);
//   }

//   if (error.code === 11000) {
//     return res.status(409).json({
//       success: false,
//       message: "This account information already exists",
//     });
//   }

//   const statusCode = error.statusCode || (
//     error.message === "Origin not allowed by CORS"
//       ? 403
//       : 500
//   );

//   res.status(statusCode).json({
//     success: false,
//     message:
//       process.env.NODE_ENV === "production"
//         ? "Internal server error"
//         : error.message,
//   });
// });

// // ======================================
// // START SERVER
// // ======================================

// const startServer = async () => {
//   try {
//     // Environment validation
//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is missing in .env");
//     }

//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI is missing in .env");
//     }

//     // Database connection
//     await connectDB();

//     const PORT = process.env.PORT || 5000;

//     app.listen(PORT, () => {
//       console.log("----------------------------------");
//       console.log("School Management Backend Started");
//       console.log("----------------------------------");
//       console.log(`Server: http://localhost:${PORT}`);
//       console.log(`Health: http://localhost:${PORT}/api/health`);
//       console.log("----------------------------------");
//     });

//   } catch (error) {
//     console.error(
//       "Server Startup Failed:",
//       error.message
//     );

//     process.exit(1);
//   }
// };

// startServer();




















import "dotenv/config";

// ==========================================
// 1. IMPORT PACKAGES
// ==========================================

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// ==========================================
// 2. DATABASE CONNECTION
// ==========================================

import connectDB from "./config/db.js";

// ==========================================
// 3. EXISTING SCHOOL ROUTES
// ==========================================

import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// ==========================================
// 4. ADMIN AND CMS ROUTES
// ==========================================

import adminRoutes from "./routes/adminRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

// ==========================================
// 5. ADMIN AUTH MIDDLEWARE
// ==========================================

import { adminAuth } from "./middleware/adminAuth.js";

// ==========================================
// 6. ADMIN CONTENT CONTROLLERS
// ==========================================

import {
  getAdminNotices,
} from "./controllers/noticeController.js";

import {
  getAdminEvents,
} from "./controllers/eventController.js";

import {
  getAdminGallery,
} from "./controllers/galleryController.js";

// ==========================================
// 7. GLOBAL ERROR HANDLER
// ==========================================

import {
  errorHandler,
} from "./middleware/errorHandler.js";

// ==========================================
// 8. CREATE EXPRESS APPLICATION
// ==========================================

import { checkOrigin } from "./middleware/checkOrigin.js";

const app = express();

app.use((req, res, next) => {
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)
  ) {
    return checkOrigin(req, res, next);
  }

  next();
});

const PORT = process.env.PORT || 4000;

// ==========================================
// 9. SECURITY MIDDLEWARE
// ==========================================

app.disable("x-powered-by");

app.use(helmet());

// ==========================================
// 10. CORS CONFIGURATION
// ==========================================

// Supports old CLIENT_URL and new FRONTEND_URL
const frontendOrigins =
  process.env.FRONTEND_URL ||
  process.env.CLIENT_URL ||
  "http://localhost:5173";

const allowedOrigins = frontendOrigins
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      const error = new Error(
        "Origin not allowed by CORS"
      );

      error.statusCode = 403;

      return callback(error);
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

// ==========================================
// 11. BODY PARSER MIDDLEWARE
// ==========================================

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

// ==========================================
// 12. COOKIE PARSER
// ==========================================

app.use(cookieParser());

// ==========================================
// 13. HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running",
  });
});

// ==========================================
// 14. HEALTH CHECK API
// ==========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Backend is healthy",
    environment:
      process.env.NODE_ENV || "development",
  });
});

// ==========================================
// 15. STUDENT AUTHENTICATION
// ==========================================

// Keep existing endpoint unchanged
app.use(
  "/api/student/auth",
  studentAuthRoutes
);

// ==========================================
// 16. CONTACT FORM ROUTES
// ==========================================

app.use(
  "/api/contact",
  contactRoutes
);

// ==========================================
// 17. ADMIN AUTHENTICATION ROUTES
// ==========================================

app.use(
  "/api/admin",
  adminRoutes
);

// ==========================================
// 18. PROTECTED ADMIN NOTICE LIST
// ==========================================

app.get(
  "/api/admin/notices",
  adminAuth,
  getAdminNotices
);

// ==========================================
// 19. PROTECTED ADMIN EVENT LIST
// ==========================================

app.get(
  "/api/admin/events",
  adminAuth,
  getAdminEvents
);

// ==========================================
// 20. PROTECTED ADMIN GALLERY LIST
// ==========================================

app.get(
  "/api/admin/gallery",
  adminAuth,
  getAdminGallery
);

// ==========================================
// 21. SCHOOL NOTICES ROUTES
// ==========================================

app.use(
  "/api/notices",
  noticeRoutes
);

// ==========================================
// 22. SCHOOL EVENTS ROUTES
// ==========================================

app.use(
  "/api/events",
  eventRoutes
);

// ==========================================
// 23. SCHOOL GALLERY ROUTES
// ==========================================

app.use(
  "/api/gallery",
  galleryRoutes
);

// ==========================================
// 24. 404 ROUTE HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ==========================================
// 25. GLOBAL ERROR HANDLER
// ==========================================

app.use(errorHandler);

// ==========================================
// 26. START BACKEND SERVER
// ==========================================

const startServer = async () => {
  try {
    console.log("Starting School Backend...");

    // JWT SECRET VALIDATION
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is missing in .env"
      );
    }

    // DATABASE ENV VALIDATION
    if (
      !process.env.MONGO_URI &&
      !process.env.MONGODB_URI
    ) {
      throw new Error(
        "MongoDB URI is missing in .env"
      );
    }

    // DATABASE CONNECTION
    await connectDB();

    // START EXPRESS SERVER
    app.listen(PORT, () => {
      console.log("--------------------------------");
      console.log("School Management Backend Started");
      console.log("--------------------------------");
      console.log(`Port: ${PORT}`);
      console.log(`Local: http://localhost:${PORT}`);
      console.log(
        `Health: http://localhost:${PORT}/api/health`
      );
      console.log(
        `Environment: ${
          process.env.NODE_ENV || "development"
        }`
      );
      console.log("--------------------------------");
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

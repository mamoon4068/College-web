import express from "express";

import { rateLimit } from "express-rate-limit";

import {
  createContactMessage
} from "../controllers/contactController.js";

import validateContact from "../middleware/ValidateContact.js";


const router = express.Router();


// Contact form spam protection
const contactLimiter = rateLimit({

  // 15 minutes
  windowMs: 15 * 60 * 1000,

  // Ek IP se maximum 5 requests
  limit: 5,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {

    success: false,

    message: "Too many messages. Please try again later."

  }

});


// POST Contact Form API
router.post(

  "/",

  contactLimiter,

  validateContact,

  createContactMessage

);


export default router;
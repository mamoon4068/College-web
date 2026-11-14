import { z } from "zod";


// Contact form validation schema
export const contactSchema = z.object({

  // Name validation
  name: z.string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(80, "Name is too long"),


  // Mobile validation
  mobile: z.string()
    .trim()
    .transform((value) => {

      // Spaces, brackets and hyphens remove
      return value.replace(/[\s()-]/g, "");

    })
    .refine(
      (value) => /^(?:\+91)?[6-9]\d{9}$/.test(value),

      "Enter a valid Indian mobile number"
    ),


  // Email validation
  email: z.string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),


  // Message validation
  message: z.string()
    .trim()
    .min(10, "Message must contain at least 10 characters")
    .max(2000, "Message is too long")

}).strict();
import { contactSchema } from "../Validators/contactValidator.js";

const validateContact = (req, res, next) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues[0]?.message || "Invalid contact details",
    });
  }
  req.validatedBody = result.data;
  return next();
};

export default validateContact;
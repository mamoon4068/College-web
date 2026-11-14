import { contactSchema } from "../Validators/contactValidator.js";


// Contact validation middleware
const validateContact = (req, res, next) => {

  // Request body validate
  const result = contactSchema.safeParse(
    req.body
  );


  // Agar validation fail ho jaaye
  if (!result.success) {

    return res.status(400).json({

      success: false,

      message: "Please check your form details",

      errors: result.error.issues.map((issue) => ({

        field: issue.path.join("."),

        message: issue.message

      }))

    });

  }


  // Sirf validated data aage bhejna
  req.validatedBody = result.data;


  // Next middleware/controller
  next();

};


export default validateContact;
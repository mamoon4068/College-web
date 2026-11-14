import ContactMessage from "../models/ContactMessage.js";


// Create Contact Message
export const createContactMessage = async (req, res) => {

  try {

    // Validated data receive
    const {

      name,

      mobile,

      email,

      message

    } = req.validatedBody;


    // MongoDB mein message create
    const newMessage = await ContactMessage.create({

      name,

      mobile,

      email,

      message

    });


    // Successful response
    return res.status(201).json({

      success: true,

      message: "Your message has been submitted successfully!",

      contactId: newMessage._id

    });


  } catch (error) {

    console.error("Contact Form Error:", error);


    // Server error response
    return res.status(500).json({

      success: false,

      message: "Unable to submit your message. Please try again."

    });

  }

};
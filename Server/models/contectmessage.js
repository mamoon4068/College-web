import mongoose from "mongoose";


// Contact form schema
const contactSchema = new mongoose.Schema({

  // Visitor name
  name: {

    type: String,

    required: true,

    trim: true,

    minlength: 2,

    maxlength: 80

  },


  // Visitor mobile number
  mobile: {

    type: String,

    required: true,

    trim: true,

    match: /^(?:\+91)?[6-9]\d{9}$/

  },


  // Visitor email
  email: {

    type: String,

    required: true,

    trim: true,

    lowercase: true

  },


  // Visitor message
  message: {

    type: String,

    required: true,

    trim: true,

    minlength: 10,

    maxlength: 2000

  },


  // Message status
  status: {

    type: String,

    enum: ["new", "read", "replied"],

    default: "new"

  }

}, {

  // Automatically createdAt and updatedAt
  timestamps: true

});


// Model create
const ContactMessage = mongoose.model(
  "ContactMessage",
  contactSchema
);


export default contactMessage;
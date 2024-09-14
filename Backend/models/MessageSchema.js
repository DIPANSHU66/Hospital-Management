const mongoose = require("mongoose");
const validator = require("validator");

const MessageSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: [3, "First name atleast 3 Charcter "],
  },
  lastname: {
    type: String,
    required: true,
    minLength: [3, "Last name atleast 3 Charcter "],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a    Valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone Number must contain    Exact 11 digits"],
    maxLength: [11, "Phone Number must contain    Exact 11 digits"],
  },

  message: {
    type: String,
    required: true,
    minLength: [10, "Message Atleast contain 10 characters"],
  },
});
module.exports = mongoose.model("Message", MessageSchema);


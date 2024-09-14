const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();
const appointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: [3, "First name atleast 3 Charcter "],
  },
  lastname: {
    type: String,
    required: true,
    minLength: [3, "First name atleast 3 Charcter "],
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
  nic: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: [true, "Dob is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  appointment_date: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstname: { type: String, required: true },
    lastname: { type: String, require: true },
  },
  hasVisted: {
    type: Boolean,
    default: false,
  },
  doctor_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: { type: mongoose.Schema.ObjectId, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});
module.exports = mongoose.model("Appointment", appointmentSchema);

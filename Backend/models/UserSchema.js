const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartement: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password"))  next();
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

UserSchema.methods.genrateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
module.exports = mongoose.model("User", UserSchema);

const { catchAsyncError } = require("../middleware/catchAsyncError");
const { ErrorHandler } = require("../middleware/errorMiddleware");
const User = require("../models/UserSchema");
const cloudinary = require("cloudinary");
const { generateToken } = require("../utils/JwtToken");
const patientregister = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;

  // Check if all required fields are provided
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please fill out the full form", 400));
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already registered", 400));
  }

  // Create a new user
  const user = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  });
  generateToken(user, "User registered successfully", 200, res);
});
const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmpassword, role } = req.body;
  if (!email || !password || !confirmpassword || !role) {
    return next(new ErrorHandler("Please Provide All Deatils", 400));
  }
  if (password != confirmpassword) {
    return next(
      new ErrorHandler("Password  and confirmPassword do  not match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password  or Email ", 400));
  }
  const ispasswordmatch = await user.comparePassword(password);
  if (!ispasswordmatch)
    return next(new ErrorHandler("Invalid Password  or Email ", 400));
  if (role != user.role)
    return next(new ErrorHandler("user with This Role is not find", 400));
  generateToken(user, "User login successfully", 200, res);
});

const addnewaddmin = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, phone, password, gender, dob, nic } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  )
    return next(new ErrorHandler("Please fill full Form ", 400));
  const isRegistered = await User.findOne({ email });
  if (isRegistered)
    return next(
      new ErrorHandler(
        `${isRegistered.role} with  this  Email Already exist!`,
        400
      )
    );
  const admin = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    Success: true,
    message: "A  new admin Registered",
  });
});
const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({ success: true, doctors });
});
const getuserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});

const logoutadmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Logout successfully" });
});
const logoutpatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Logout successfully" });
});

const addnewdoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
  if (!allowedFormats.includes(docAvatar.mimetype))
    return next(new ErrorHandler("File  Format Not  Supported", 400));
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartement,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartement
  )
    return next(new ErrorHandler("Please Provide Full Details", 400));
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role}  is already registerd with this  email`,
        400
      )
    );
  }
  const CloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!CloudinaryResponse || CloudinaryResponse.error)
    console.error(
      "Cloudinary Error:",
      CloudinaryResponse.error || "unKown cloudinary Error"
    );
  const doctor = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartement,
    role: "Doctor",
    docAvatar: {
      public_id: CloudinaryResponse.public_id,
      url: CloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New  Doctor registered",
    doctor,
  });
});
module.exports = {
  patientregister,
  login,
  addnewaddmin,
  getAllDoctors,
  getuserDetails,
  logoutadmin,
  logoutpatient,
  addnewdoctor,
};

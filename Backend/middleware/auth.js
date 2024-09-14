const { catchAsyncError } = require("./catchAsyncError");
const { ErrorHandler } = require("../middleware/errorMiddleware");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
require("dotenv").config();
const isadminAuthenticted = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin Not Authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role != "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role}  is authroized for this  resource`,
        403
      )
    );
  }
  next();
});
const ispatientAuthenticted = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("Admin Not Authenticated", 400));
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role != "Patient") {
    return next(
      new ErrorHandler(
        `${req.user.role}  is authroized for this  resource`,
        403
      )
    );
  }
  next();
});
module.exports = { isadminAuthenticted, ispatientAuthenticted };

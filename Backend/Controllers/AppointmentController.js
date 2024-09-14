const { catchAsyncError } = require("../middleware/catchAsyncError");
const { ErrorHandler } = require("../middleware/errorMiddleware");
const Appointment = require("../models/appontementSchema");
const User = require("../models/UserSchema");
const postAppointement = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstname,
    doctor_lastname,
    hasVisted,
    address,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstname ||
    !doctor_lastname ||
    !address
  ) {
    return next(new ErrorHandler("Please fill full  Details", 400));
  }
  const isConflict = await User.find({
    firstname: doctor_firstname,
    lastname: doctor_lastname,
    role: "Doctor",
    doctorDepartement: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not Found", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "More Doctors with this details found Contact Through Email  or Phone",
        404
      )
    );
  }
  const doctor_id = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstname: doctor_firstname,
      lastname: doctor_lastname,
    },
    hasVisted,
    address,
    doctor_id,
    patientId,
  });
  res.status(200).json({
    success: true,
    message: "Appointment Sent Successfully",
    appointment,
  });
});
const getallappointments = catchAsyncError(async (rq, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});
const updtaeAppointmentStatus = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found", 404));
  }
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Appointment Status updated",
    appointment,
  });
});
const deleteappointment = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted",
  });
});
module.exports = {
  postAppointement,
  getallappointments,
  updtaeAppointmentStatus,
  deleteappointment,
};

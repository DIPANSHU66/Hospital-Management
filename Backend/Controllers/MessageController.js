const Message = require("../models/MessageSchema");
const { catchAsyncError } = require("../middleware/catchAsyncError");
const { ErrorHandler } = require("../middleware/errorMiddleware");

const SendMessage = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, phone, message } = req.body;
  if (!firstname || !lastname || !email || !phone || !message)
    return next(new ErrorHandler("please Fill Full Form ", 400));

  await Message.create({ firstname, lastname, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Send Successfully",
  });
});

const getAllmessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });

});
module.exports = { SendMessage,getAllmessages };

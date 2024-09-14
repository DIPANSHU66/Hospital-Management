class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal  Servar error";
  err.statuscode = err.statuscode || 500;
  if (err.code == 11000) {
    const message = `Duplictae ${Object.keys(err.keyvalue)}`;
    err = new ErrorHandler(message, 400);
  } else if (err.name == "jsonwebTokenError") {
    const message = "json web token Invalid Try again";
    err = new ErrorHandler(message, 400);
  }
 else if (err.name == "TokenExpiredError") {
    const message = "json web token Expired";
    err = new ErrorHandler(message, 400);
  }
  else  if (err.name == "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  const errmessage = err.errors
    ? Object.values(err.errors)
        .map((errors) => errors.message)
        .join(" ")
    : err.message;
  return res.status(err.statuscode).json({
    success: false,
    message: errmessage,
  });
};
module.exports = { ErrorHandler, errorMiddleware };

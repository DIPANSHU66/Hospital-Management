const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { errorMiddleware } = require("../Backend/middleware/errorMiddleware");
const { dbconnection } = require("../Backend/database/dbConnection");
const messagerouter = require("../Backend/router/MessageRouter");
const userRouter = require("../Backend/router/UserRouter");
const appointmentrouter = require("../Backend/router/AppointmentRouter");

require("dotenv").config({});
const cloudinary = require("cloudinary");
const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
PORT = process.env.PORT || 4000;
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempfileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messagerouter);
app.use("/api/v1/appointment", appointmentrouter);
app.use("/api/v1/user", userRouter);

dbconnection();
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server Listen at Port :${PORT}`);
});

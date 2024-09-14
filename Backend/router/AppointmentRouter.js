const express = require("express");
const router = express.Router();
const {
  postAppointement,
  getallappointments,
  updtaeAppointmentStatus,
  deleteappointment,
} = require("../Controllers/AppointmentController");
const {
  ispatientAuthenticted,
  isadminAuthenticted,
} = require("../middleware/auth");
router.post("/post", ispatientAuthenticted, postAppointement);
router.get("/getall", isadminAuthenticted, getallappointments);
router.put("/update/:id", isadminAuthenticted, updtaeAppointmentStatus);
router.delete("/delete/:id", deleteappointment);
module.exports = router;

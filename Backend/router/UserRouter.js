const express = require("express");
const router = express.Router();
const {
  patientregister,
  login,
  addnewaddmin,
  getAllDoctors,
  getuserDetails,
  logoutadmin,
  logoutpatient,
  addnewdoctor,
} = require("../Controllers/UserController");
const {
  isadminAuthenticted,
  ispatientAuthenticted,
} = require("../middleware/auth");

router.post("/patient/register", patientregister);
router.post("/login", login);
router.post("/admin/addnew", isadminAuthenticted, addnewaddmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isadminAuthenticted, getuserDetails);
router.get("/patient/me", ispatientAuthenticted, getuserDetails);
router.get("/admin/logout", isadminAuthenticted, logoutadmin);
router.get("/patient/logout", ispatientAuthenticted, logoutpatient);
router.post("/doctor/addnew", isadminAuthenticted, addnewdoctor);

module.exports = router;

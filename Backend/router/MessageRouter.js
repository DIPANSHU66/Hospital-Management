const express = require("express");
const router = express.Router();
const {
  SendMessage,
  getAllmessages,
} = require("../Controllers/MessageController");
const { isadminAuthenticted } = require("../middleware/auth");
router.post("/send", SendMessage);
router.get("/getall", isadminAuthenticted, getAllmessages);
module.exports = router;

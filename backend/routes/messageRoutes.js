const express = require("express");
const router = express.Router();

const messageContoller = require("../controllers/messageController");

const multer = require("multer");
const storage = multer;
const upload = multer({ storage: multer.memoryStorage() });

// POST new message from chat
router.post(
  "/new-message",
  upload.single("image"),
  messageContoller.new_message_post
);

// POST new group message
router.post(
  "/new-group-message",
  upload.single("image"), // image is the form data input name
  messageContoller.new_group_message_post
);

module.exports = router;

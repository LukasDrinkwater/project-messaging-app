const express = require("express");
const router = express.Router();

const messageContoller = require("../controllers/messageController");

// GET test reponse
// router.get("/check-auth", authController.test_check);

// POST new message from chat
router.post("/new-message", messageContoller.new_message_post);

// POST new group message
router.post("/new-group-message", messageContoller.new_group_message_post);

module.exports = router;

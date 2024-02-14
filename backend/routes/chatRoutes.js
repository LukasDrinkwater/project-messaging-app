const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

// POST create a new chat
router.post("/new-chat", chatController.create_new_chat_post);

// GET specfic user chat
router.get("/:chatId", chatController.user_specfic_chat_get);

module.exports = router;

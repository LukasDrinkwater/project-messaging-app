const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

// Get all the users chats
router.get("/all-users-chats", chatController.all_users_chats_get);

// POST create a new chat
router.post("/new-chat", chatController.create_new_chat_post);

// GET specfic user chat
router.get("/:chatId", chatController.user_specific_chat_get);

// test for testing
router.get("/testing", (req, res, next) => {
  res
    .status(200)
    .json({ chat: { messages: ["chat1", "chat2"], user: "user1" } });
});

module.exports = router;

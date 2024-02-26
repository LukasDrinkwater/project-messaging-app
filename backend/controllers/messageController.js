const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Import models
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");
const Chats = require("../models/Chats");

// POST new message from chat
exports.new_message_post = [
  body("content", "The message must be at least 1 character")
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const chatId = req.body.chatId;

    // get the chat its going to be added to
    const chat = await Chats.findById(chatId).exec();

    if (chat === null) {
      res.status(400).json({ error: "cant find chat to add message to" });
    }

    if (!errors.isEmpty()) {
      res.sendStatus(400);
      return;
    } else {
      // create new message
      const newMessage = new Messages({
        sender: req.user.id,
        content: req.body.content,
        chat: chatId,
      });

      await newMessage.save();
      // update chat messages array

      const updatedChat = await Chats.findOneAndUpdate(
        { _id: chatId },
        {
          $push: { messages: newMessage },
          $set: {
            lastMessage: newMessage.content,
          },
        },

        { new: true }
      );

      if (updatedChat === null) {
        res.status(204).json({ error: "Coulnt find chat to update" });
      }

      // message has been added to the chat
      res.sendStatus(201);
    }
  }),
];

// exports.get_user_message_preview = asyncHandler(async (req, res, next) => {
//   const userSender = req.params.userSender;
//   const userReceiver = req.params.userReceiver;
// });

// exports.new_user_message_post = asyncHandler(async (req, res, next) => {
//   const userSender = req.params.userSender;
//   const userReceiver = req.params.userReceiver;
// });

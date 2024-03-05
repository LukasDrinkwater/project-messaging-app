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

exports.new_group_message_post = [
  body("content", "The message must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const groupId = req.body.groupId;

    const group = await Groups.findById(groupId).exec();

    if (group === null) {
      return res.sendStatus(400);
    }

    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }

    // create new group message
    const newMessage = new Messages({
      sender: req.user.id,
      content: req.body.content,
      group: groupId,
    });

    await newMessage.save();

    // Update the group last message
    const updatedGroup = await Groups.findByIdAndUpdate(
      groupId,
      {
        $set: {
          lastMessage: newMessage.content,
        },
      },
      { new: true }
    );

    if (updatedGroup === null) {
      return res
        .status(204)
        .json({ error: "Couldn't find the group to update" });
    }

    // last message was updated
    res.sendStatus(201);
  }),
];

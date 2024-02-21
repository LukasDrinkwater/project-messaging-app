const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

// Import models
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");
const Chats = require("../models/Chats");

// Get all the users chats
exports.all_users_chats_get = asnycHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Get all chats that current logged in use is in.
  const allChats = await Chats.find({
    users: {
      $all: [userId],
    },
  })
    .populate({
      path: "users",
      select: "username _id",
    })
    .exec();

  if (allChats === null) {
    res.status();
  }
});

exports.create_new_chat_post = asnycHandler(async (req, res, next) => {
  // check to see if a chat already exists
  const chatExists = await Chats.find({
    uses: { $all: [req.user.id, req.body.userToChatWith] },
  });

  const [user, userReceiver] = await Promise.all([
    Users.findById(req.user.id).exec(),
    Users.findById(req.body.userToChatWith).exec(),
  ]);
  // console.log("user", user);
  // console.log("receiver", userReceiver);

  if (user === null || userReceiver === null) {
    res.sendStatus(204);
  } else {
    const usersForChat = [user, userReceiver];
    const newChat = new Chats({
      users: usersForChat,
    });
    await newChat.save();
    res.status(201).json({ chatCreated: true, chatId: newChat.id }).send();
  }
});

exports.user_specfic_chat_get = asnycHandler(async (req, res, next) => {
  console.log(req.params.chatId);
  const chatId = req.params.chatId;
  const userId = req.user.id;

  const chatMessages = await Messages.find({ chat: chatId })
    .populate({ path: "sender", select: "username _id" })
    .sort({ createdAt: 1 })
    .exec();

  console.log("getting chat");

  if (chatMessages === null) {
    res.status(200).json({ message: "No chats" });
  }

  res.json({ chatMessages, userId });
});

const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

// Import models
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");
const Chats = require("../models/Chats");

exports.current_users_chats_get = asnycHandler(async (req, res, next) => {
  // // const allUsersChats = await Chats.find()
  // const allUserChats = await Chats.find({
  //   users: mongoose.Types.ObjectId(userId),
  // })
  //   .populate("messages") // Optionally populate messages if needed
  //   .exec((err, chats) => {
  //     if (err) {
  //       // Handle error
  //       console.error(err);
  //       return res.status(500).json({ error: "Internal Server Error" });
  //     }
  //     // get the current users chats
  //   });
  // console.log(allUserChats);
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
  const userId = req.user.id;
  console.log("getting chat");

  // find the chat
  // try {
  const usersChat = await Chats.findById(req.params.chatId)
    .populate("messages")
    .exec();

  console.log(usersChat);

  if (usersChat === null) {
    res.status(204).json({ error: "Could find chat" });
  } else {
    console.log("responding");
    // res.status(200).json({ chat: usersChat });
    res.status(200).json({ userId, messages: usersChat.messages });
    // res.json({ message: "testing" });
  }
});

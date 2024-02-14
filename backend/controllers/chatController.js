const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

// Import models
const User = require("../models/Users");
const Message = require("../models/Messages");
const Group = require("../models/Groups");
const Chat = require("../models/Chats");

exports.current_users_chats_get = asnycHandler(async (req, res, next) => {
  // // const allUsersChats = await Chats.find()
  // const allUserChats = await Chat.find({
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
  const chatExists = await Chat.find({
    uses: { $all: [req.user.id, req.body.userToChatWith] },
  });

  // if (chatExists) {
  // next();
  // } else {
  // try {
  const [user, userReceiver] = await Promise.all([
    User.findById(req.user.id).exec(),
    User.findById(req.body.userToChatWith).exec(),
  ]);
  // console.log("user", user);
  // console.log("receiver", userReceiver);

  if (user === null || userReceiver === null) {
    res.sendStatus(204);
  } else {
    const usersForChat = [user, userReceiver];
    const newChat = new Chat({
      users: usersForChat,
    });
    await newChat.save();
    res.status(201).json({ chatCreated: true, chatId: newChat.id }).send();
  }
  // }

  // } catch (error) {
  // console.log("Error in current_users_chats_get:", error);
  // }
});

exports.user_specfic_chat_get = asnycHandler(async (req, res, next) => {
  console.log("getting chat");
  console.log(req.params.chatId);
  // find the chat
  // try {
  const usersChat = await Chat.findById(req.params.chatId)
    .populate("users")
    // .populate({
    //   path: "messages",
    //   options: { sort: { createdAt } },
    // })
    .exec((error) => {
      if (error) {
        console.log("Error getting specific chat:", error);
      }
    });

  console.log(usersChat);
  // } catch (error) {
  // console.log("Error getting specific chat:", error);
  // res.sendStatus(204).json({ error });
  // }

  // send the chat
});

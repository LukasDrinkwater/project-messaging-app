const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Import models
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");
const Chats = require("../models/Chats");

// Get all the users chats
exports.all_users_chats_get = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Get all chats that current logged in use is in.
  const [allChats, usersContacts] = await Promise.all([
    Chats.find({
      users: {
        $all: [userId],
      },
    })
      .populate({
        path: "users",
        select: "username _id",
      })
      .sort({ createdAt: 1 })
      .exec(),
    Users.findById(userId).populate("contacts").exec(),
  ]);

  // link chat to contact and create new array.
  // Links the chat and contact. Creates a new object that has chatId, lastMessage, contact obj,
  // and updatedAtFormatted. I do this so I dont have to link them on the front end.
  // Works for  chats because its just the user and 1 contact in the Chat model array.
  const matchedChats = allChats.map((chat) => {
    // Find the contact that matches a user in the chat that is not the current user
    const matchedContact = chat.users
      .filter((user) => user.id !== userId) // Filter out the current user
      .map((user) =>
        usersContacts.contacts.find((contact) => contact.id === user.id)
      )[0]; //The [0] at the end of the line is used to extract the first
    //  element from the array resulting from the map operation.

    return {
      chatId: chat.id,
      lastMessage: chat.lastMessage,
      contact: matchedContact, // This assumes there's always a match; consider handling cases where there might not be
      updatedAtFormatted: chat.updatedAtFormatted,
    };
  });

  if (allChats === null) {
    res.status(204).json({ message: "no chats found" });
  }

  res
    .status(200)
    .json({ allChats, usersContacts: usersContacts.contacts, matchedChats });
});

exports.create_new_chat_post = asyncHandler(async (req, res, next) => {
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

exports.user_specific_chat_get = asyncHandler(async (req, res, next) => {
  console.log(req.params.chatId);
  const chatId = req.params.chatId;
  const userId = req.user.id;

  const [chatMessages, chatContact] = await Promise.all([
    Messages.find({ chat: chatId })
      .populate({ path: "sender", select: "username _id" })
      .sort({ createdAt: 1 })
      .exec(),
    Chats.findById(chatId)
      .populate({
        path: "users",
        select: "username _id",
        match: { _id: { $ne: userId } }, // Exclude the current user
      }) // $ne is not equal
      .exec(),
  ]);

  const contact = chatContact.users[0];

  console.log("getting chat");

  if (chatMessages === null) {
    res.status(200).json({ message: "No chats" });
  }

  res.json({ chatMessages, userId, contact });
});

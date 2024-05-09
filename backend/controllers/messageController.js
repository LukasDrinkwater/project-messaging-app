const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// Import models
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");
const Chats = require("../models/Chats");

// multer setup
const multer = require("multer");
// const upload = multer({ dest: "upload/" }); //for saving it locally
const upload = { storage: multer.memoryStorage() };

// cloudinary setup
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "divk7ypa9",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const cloundaryBaseUrl = process.env.CLOUDINARY_BASE_URL;

// POST new message from chat
exports.new_message_post = [
  body("content", "The message must be at least 1 character").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Get details from the req
    const chatId = req.body.chatId;
    let clouninaryId = null;

    // Validate input
    if (!errors.isEmpty()) {
      res.sendStatus(400).json(errors);
      return;
    }

    try {
      // Get the chat and check if it finds it
      const chat = await Chats.findById(chatId).exec();
      if (chat === null) {
        res.status(400).json({ error: "Cannot find chat to add message to" });
        return;
      }

      // If there is an image attached
      if (req.file) {
        // upload the image
        // Base 64 encode the file to create a data URI for the uploader
        const base64EncodedImage = Buffer.from(req.file.buffer).toString(
          "base64"
        );
        const dataUri = `data:${req.file.mimetype};base64,${base64EncodedImage}`;
        // Options for uploading to cloudinary
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        };

        const response = await cloudinary.uploader.upload(dataUri, options);
        // update the cloudinaryId
        clouninaryId = `https://res.cloudinary.com/divk7ypa9/image/upload/${response.public_id}`;
      }

      // Create new message
      const newMessage = new Messages({
        sender: req.user.id,
        content: req.body.content,
        chat: chatId,
        file: clouninaryId,
      });

      // Save new message
      await newMessage.save();

      // Update chat last message
      const updatedChat = await Chats.findOneAndUpdate(
        { _id: chatId },
        {
          $set: {
            lastMessage:
              newMessage.content === null ? "Image" : newMessage.content,
          },
        },

        { new: true }
      );

      if (updatedChat === null) {
        res.status(204).json({ error: "Could not find chat to update" });
        return;
      }

      // Message has been added to the chat
      res.sendStatus(201);
    } catch (error) {
      console.log("Error saving message:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the message" });
    }
  }),
];

exports.new_group_message_post = [
  body("content", "The message must be at least 1 character long.")
    .trim()
    .escape(),
  // had to remove .isLength({ min: 1 }) to allow the image to be sent by itself

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Get the form data from the req
    const groupId = req.body.groupId;
    let cloudinaryId = "";

    // Validate input
    if (!errors.isEmpty()) {
      return res.sendStatus(400).json(errors);
    }

    try {
      // Get the group and check if it finds it
      const group = await Groups.findById(groupId).exec();
      if (group === null) {
        return res
          .sendStatus(400)
          .json({ error: "Cannot find group to add message to." });
      }

      // If there is an image attached
      if (req.file) {
        // upload the image
        // Base 64 encode the file to create a data URI for the uploader
        const base64EncodedImage = Buffer.from(req.file.buffer).toString(
          "base64"
        );
        const dataUri = `data:${req.file.mimetype};base64,${base64EncodedImage}`;
        // Options for uploading to cloudinary
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        };

        const response = await cloudinary.uploader.upload(dataUri, options);
        // update the cloudinaryId
        cloudinaryId = `https://res.cloudinary.com/divk7ypa9/image/upload/${response.public_id}`;
      }

      // create new group message
      const newMessage = new Messages({
        sender: req.user.id,
        content: req.body.content,
        group: groupId,
        file: cloudinaryId,
      });
      // Save new message
      await newMessage.save();

      // Update group chat last message
      const updatedGroupChat = await Groups.findOneAndUpdate(
        { _id: groupId },
        {
          $set: {
            lastMessage:
              newMessage.content === null ? "Image" : newMessage.content,
          },
        },
        { new: true }
      );

      if (updatedGroupChat === null) {
        res.status(204).json({ error: "Could not find group to update" });
      }

      // last message was updated
      res.sendStatus(201);
    } catch (error) {
      res.status(404).json({ error: "Could not find gorup to update", error });
      return;
    }
  }),
];

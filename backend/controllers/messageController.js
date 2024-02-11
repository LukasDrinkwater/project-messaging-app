const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

// Import models
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");

exports.get_user_message_preview = asnycHandler(async (req, res, next) => {
  const userSender = req.params.userSender;
  const userReceiver = req.params.userReceiver;
});

exports.new_user_message_post = asnycHandler(async (req, res, next) => {
  const userSender = req.params.userSender;
  const userReceiver = req.params.userReceiver;
});

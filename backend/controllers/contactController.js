const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

const User = require("../models/Users");
const Chat = require("../models/Chats");
const Message = require("../models/Messages");

// POST add new contact
exports.add_new_contact_post = [
  body("usernameToAdd", "Username must me at least 1 character long")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asnycHandler(async (req, res, next) => {
    // console.log(req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.sendStatus(400);
      return;
    } else {
      // Find the user that will be added as a contact
      const [usernameToAdd, currentUser] = await Promise.all([
        // User.findById(req.user._id),
        User.findOne({ username: req.body.usernameToAdd }).exec(),
        User.findById(req.user._id).populate("contacts").exec(),
      ]);

      // Check to see if the usernameToAdd is already in the contacts array
      // console.log(usernameToAdd);
      console.log(currentUser.contacts);

      // checks each array object to see if any of them already === usernameToAdd.id
      const userAlreadyAdded = currentUser.contacts.some(
        (contact) => contact.id === usernameToAdd.id
      );
      if (userAlreadyAdded) {
        res.status(400).send("Contact already added");
        return;
      }

      if (usernameToAdd === null) {
        res.status(404).send("Cannot find contact to add");
      } else {
        // Push the added contact to the users contacts array
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
          $push: { contacts: usernameToAdd },
        });

        if (updatedUser === null) {
          res.sendStatus(400);
          return;
        }

        res
          .status(200)
          .json({ message: "found the user", foundUser: true })
          .send();
      }
      // const user;
    }
  }),
];

// GET all contacts for current user
exports.all_contacts_for_current_user_get = asnycHandler(
  async (req, res, next) => {
    console.log(req.user.id);

    const [user, usersChats] = await Promise.all([
      User.findById(req.user.id).populate("contacts").exec(),
      Chat.find({
        users: {
          $all: [req.user.id],
        },
      })
        .populate("messages")
        .populate("users")
        .exec(),
    ]);

    const allContacts = user.contacts;

    // console.log("USER CHATS", usersChats);
    if (user === null) {
      console.log("user not found");
      res.sendStatus(204);
    }
    // if (user.contacts === null) {
    //   res.sendStatus(204);
    // } else {

    res.json({ allContacts, usersChats });
    // res.json({ allContacts });
    // }
  }
);

exports.test = asnycHandler(async (req, res, next) => {
  res.json({ message: "working" });
});
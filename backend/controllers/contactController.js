const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Users = require("../models/Users");
const Chats = require("../models/Chats");
const Messages = require("../models/Messages");

// POST add new contact
exports.add_new_contact_post = [
  body("usernameToAdd", "Username must me at least 1 character long")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // console.log(req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.sendStatus(400);
      return;
    } else {
      // Find the user that will be added as a contact
      const [usernameToAdd, currentUser] = await Promise.all([
        // User.findById(req.user._id),
        Users.findOne({ username: req.body.usernameToAdd }).exec(),
        Users.findById(req.user._id).populate("contacts").exec(),
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
        const updatedUser = await Users.findByIdAndUpdate(req.user._id, {
          $push: { contacts: usernameToAdd },
        });
        console.log(updatedUser);

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
exports.all_contacts_for_current_user_get = asyncHandler(
  async (req, res, next) => {
    const [user, usersChats] = await Promise.all([
      Users.findById(req.user.id).populate("contacts").exec(),
      Chats.find({
        users: {
          $all: [req.user.id],
        },
      })

        .populate({
          path: "users",
          select: "username _id",
        })
        .exec(),
    ]);

    const allContacts = user.contacts;
    // console.log(usersChats);

    if (user === null) {
      console.log("user not found");
      res.sendStatus(204);
    }
    console.log("users chats", usersChats);
    res.json({ allContacts, usersChats });
  }
);

// DELETE contact from user contacts
exports.delete_specific_contact = asyncHandler(async (req, res, next) => {
  const contactId = req.params.contactId;
  const userId = req.user.id;

  const user = await Users.findByIdAndUpdate(userId, {
    $pull: {
      contacts: contactId,
    },
  });

  if (user === null) {
    res.status(204).send("Can't find user.");
  }

  res.status(200).send("Contact removed from contacts");
});

exports.test = asyncHandler(async (req, res, next) => {
  res.json({ message: "working" });
});

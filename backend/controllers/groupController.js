const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Users = require("../models/Users");
const Chats = require("../models/Chats");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");

// Create new group POST
exports.create_new_group_post = [
  body("groupName", "The group name must be atleast 1 character.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors });
      return;
    } else {
      // Get current user and add them to the group
      const currentUser = await Users.findById(req.user.id).exec();
      console.log(currentUser);
      const updatedGroupUsers = [...req.body.groupUsers, currentUser];

      // Create new group
      const newGroup = new Groups({
        name: req.body.groupName,
        users: updatedGroupUsers,
      });

      console.log("saving group");
      await newGroup.save();
      res.sendStatus(201).json({ newGroup });
    }
  }),
];
// GET all of the users groups
exports.all_users_groups_get = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const usersGroups = await Groups.find({
    users: {
      $all: [userId],
    },
  }).exec();

  res.json({ usersGroups });
});

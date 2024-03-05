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
      res.status(201).json({ newGroup });
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

// GET specific group
exports.get_specific_group_chat = asyncHandler(async (req, res, next) => {
  // console.log(req.user.id);
  // console.log(req.params.groupId);
  const userId = req.user.id;
  const groupId = req.params.groupId;

  const [groupChatMessages, groupChat] = await Promise.all([
    Messages.find({ group: groupId })
      .populate({ path: "sender", select: "username _id" })
      .sort({ createdAt: 1 })
      .exec(),
    Groups.findById(groupId)
      .populate({
        path: "users",
        select: "username _id",
        match: { _id: { $ne: userId } }, // Exclude the current user
      }) // $ne is not equal.
      .exec(),
  ]);

  // console.log("groupChatMessages", groupChatMessages);
  // console.log("groupChat", groupChat);

  if (groupChatMessages === null || groupChat === null) {
    res.status(204).send("group chat messages or groupChat not found.");
  }

  res.status(200).json({ groupChatMessages, groupChat, userId });
});

// GET users in specific group
exports.get_specific_group_users = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const groupId = req.params.groupId;

  // Destructure the returned object. Take out the users array and assign
  // it to allGroupUsers
  const { users: allGroupUsers } = await Groups.findById(groupId).populate({
    path: "users",
    select: "username _id",
    match: { _id: { $ne: userId } },
  });

  res.json({ allGroupUsers });
});

// GET specific group details
exports.get_specific_group_details = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const groupId = req.params.groupId;

  // Destructure the returned object. Take out the users array and assign
  // it to allGroupUsers
  const groupDetail = await Groups.findById(groupId)
    .populate({
      path: "users",
      select: "username _id",
      match: { _id: { $ne: userId } },
    })
    .populate("name")
    .exec();

  res.json({ groupDetail });
});

// DELETE specific user from the group
exports.delete_specific_user = asyncHandler(async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  const updatedGroup = await Groups.findByIdAndUpdate(
    groupId,
    { $pull: { users: userId } }, // $pull pulls(removes) the value from the array
    // that matches the argument i.e users: userId
    { new: true }
  );

  if (updatedGroup === null) {
    res.status(204).send("Can't find the group");
    return;
  }

  res.status(200).send("User removed from group");
});

// PATCH specific user to group
exports.patch_add_specific_user_to_group = asyncHandler(
  async (req, res, next) => {
    const contactId = req.params.userId;
    const groupId = req.params.groupId;

    const userToAdd = await Users.findById(contactId).exec();
    console.log(userToAdd);

    if (userToAdd === null) {
      return res.status(204).send("Can't find user.");
    }

    await Groups.findByIdAndUpdate(groupId, {
      $push: { users: userToAdd },
    });

    res.status(200).send("Contact added to group.");
  }
);

// PATCH update specific group name
exports.patch_update_specific_group_name = [
  body("groupName", "The group name must be atleast 1 character.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.sendStatus(400);
      return;
    }
  }),
];

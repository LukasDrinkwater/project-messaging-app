const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");

// Create new group POST
router.post("/create-group", groupController.create_new_group_post);

// GET all of the users groups
router.get("/users-groups", groupController.all_users_groups_get);

// GET specific group
router.get("/:groupId", groupController.get_specific_group_chat);

// GET users in specific group
router.get("/:groupId/users", groupController.get_specific_group_users);

// GET specific group details
router.get("/:groupId/details", groupController.get_specific_group_details);

// PATCH update specific group name
router.patch(
  "/:groupId/update-name",
  groupController.patch_update_specific_group_name
);

// DELETE specific user from the group
router.delete(
  "/:groupId/users/:userId/remove-user",
  groupController.delete_specific_user
);

// PATCH specific user to group
router.patch(
  "/:groupId/users/:userId/add-user",
  groupController.patch_add_specific_user_to_group
);
module.exports = router;

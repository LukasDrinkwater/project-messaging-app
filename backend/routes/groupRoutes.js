const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");

// Create new group POST
router.post("/create-group", groupController.create_new_group_post);

// GET all of the users groups
router.get("/users-groups", groupController.all_users_groups_get);

module.exports = router;

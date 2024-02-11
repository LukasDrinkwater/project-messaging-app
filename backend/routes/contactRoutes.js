const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

// TEST
router.get("/add", contactController.test);

// POST add new contact
router.post("/add", contactController.add_new_contact_post);

// GET all contacts for current user
router.get(
  "/users-contacts",
  contactController.all_contacts_for_current_user_get
);

module.exports = router;

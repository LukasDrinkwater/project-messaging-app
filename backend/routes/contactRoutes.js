const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

// multer setup
const multer = require("multer");
const storage = multer;
// const upload = multer({ dest: "upload/" }); //for saving it locally
const upload = multer({ storage: multer.memoryStorage() });

// TEST
router.get("/add", contactController.test);

// GET current user details
router.get("/profile", contactController.get_current_user);

// POST add new contact
router.post("/add", contactController.add_new_contact_post);

// GET all contacts for current user
router.get(
  "/users-contacts",
  contactController.all_contacts_for_current_user_get
);

// DELETE contact from user contacts
router.delete(
  "/:contactId/remove-contact",
  contactController.delete_specific_contact
);

// POST add a new profile image
router.post(
  "/add-profile-image",
  upload.single("image"), // image is the form data input name
  contactController.post_add_profile_image
);

module.exports = router;

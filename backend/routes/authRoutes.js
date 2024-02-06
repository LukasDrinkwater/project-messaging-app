const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// GET test reponse
router.get("/check-auth", authController.test_check);

module.exports = router;

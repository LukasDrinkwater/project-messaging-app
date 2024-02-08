const express = require("express");
const router = express.Router();

// Passxport for login
const passport = require("passport");
const authController = require("../controllers/authController");
const { login } = require("../strategies/authentication");

// GET test reponse
router.get("/check-auth", authController.test_check);

// POST Login form
// when passport.authenticate is called its going through the localStrategy defined
// in app.js
router.post("/login", passport.authenticate("local"), login);

// POST signup new user
router.post("/signup", authController.signup_post);

// POST logout
router.post("/logout", authController.logout_post);

module.exports = router;

const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

const User = require("../models/Users");

const passport = require("passport");

// Test API GET
exports.test_check = asnycHandler(async (req, res, next) => {
  console.log(res);
  res.json({ message: "hey im a test reponse" }).statusCode(200).send();
});

// POST Check if user is already logged in
exports.check_if_user_logged_in = asnycHandler(async (req, res, next) => {
  // isAuthenticated needs to be called ()
  if (req.isAuthenticated()) {
    console.log("logged in");
    res.status(200).json({ loggedIn: true });
  } else {
    console.log("not logged in");
    res.json({ loggedIn: false });
  }
});

// POST signup new user
exports.signup_post = [
  body("username", "Username must be atleast 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be atleast 1 character long")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "email must be valid").isEmail().escape(),

  asnycHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.sendStatus(400);
      return;
    } else {
      // Set up base default image
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const defaultImageUrl = `${baseUrl}/images/default.png`;

      // create a new user
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profilePic: defaultImageUrl,
      });
      console.log("saving user");
      await newUser.save();
      console.log("user saved");
      res.sendStatus(200);
    }
  }),
];

exports.logout_post = asnycHandler(async (req, res, next) => {
  req.logout((error) => {
    // res.session.destroy() gets rid of the cookie
    req.session.destroy();
    if (error) {
      return next(error);
    }
    res.status(200).clearCookie("connect.sid").send();
  });
});

// username:
// password:
// email: {
// messages:
// group: [{
// contacts:

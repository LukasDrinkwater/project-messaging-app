// Authenticate login

const passport = require("passport");

const login = (req, res) => {
  // If this function is called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log("login req.user", req.user);
  // res.cookie("blog_cookie", "12345");
  res.status(200).json({ message: "Login successful", user: req.user });
};

const checkLoggedIn = (req, res, next) => {
  if (req.user) {
    // console.log(req.user);
    return next();
  }
  res.status(403).json({ message: "You need to be logged in." });
};

module.exports = { login, checkLoggedIn };

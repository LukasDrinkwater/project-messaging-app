const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
// Requirements for passport
const session = require("express-session");
const passport = require("passport");
// const LocalStrategy = require("passport-local");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Import routes
const indexRouter = require("./routes/indexRoutes");
const authRouter = require("./routes/authRoutes");

// Import models
const User = require("./models/Users");

const app = express();
const port = process.env.PORT || 3000; // Set your desired port or use a default (e.g., 3000)

// Setup mongoose mongoDB connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_STRING;

main().catch((error) => console.log(error));
async function main() {
  await mongoose.connect(mongoDB);
}
console.log(mongoose.connection.readyState);

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  //cors is needed to allow requests from the React front end
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const SECRET_STRING = process.env.SECRET_STRING;
app.use(
  session({ secret: SECRET_STRING, resave: false, saveUninitialized: true })
);

// Middleware setup for passport
// Passport local strategy
// This function is what will be called when using passport.authenticate()
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
// sessions and serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
app.use(express.urlencoded({ extended: false })); //set to true for JSON
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// Routes setup
app.use("/api", indexRouter);
app.use("/authentication", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Additional event listener for handling server errors
server.on("error", (error) => {
  console.error("Server error:", error.message);
});

module.exports = app;

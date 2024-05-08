const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
// Requirements for passport
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bcrypt = require("bcryptjs");

// Import routes
const indexRouter = require("./routes/indexRoutes");
const contactRouter = require("./routes/contactRoutes");
const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
const groupRouter = require("./routes/groupRoutes");

// Import models
const User = require("./models/Users");

const app = express();
const port = process.env.PORT || 3000; // Set your desired port or use a default (e.g., 3000)

// use the require mongoConfig when implenting testing.
require("./mongoConfig");
// Setup mongoose mongoDB connection
// For testing it has been moved into the mongoConfig.js file
// So it can be used for the mongodb-memory-server

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// app.use(
//   //cors is needed to allow requests from the React front end
//   cors({
//     // origin: ["http://localhost:5173", "http://localhost:5000"],
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     optionsSuccessStatus: 200,
//   })
// );
const SECRET_STRING = process.env.SECRET_STRING;
app.use(
  // session({ secret: SECRET_STRING, resave: false, saveUninitialized: true })
  session({
    secret: SECRET_STRING,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

// Middleware setup for passport
// Passport local strategy
// This function is what will be called when using passport.authenticate()
const passport = require("./strategies/passportConfig"); // Import Passport configuration file

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username: username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       const match = await bcrypt.compare(password, user.password);
//       if (!match) {
//         // passwords do not match!
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );
// // sessions and serialization
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
app.use(express.urlencoded({ extended: false })); //set to true for JSON
app.use(passport.session());
app.use(passport.initialize());

// Routes setup
app.use("/api", indexRouter);
app.use("/api/contacts", contactRouter);
app.use("/authentication", authRouter);
app.use("/api/chats", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/groups", groupRouter);

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

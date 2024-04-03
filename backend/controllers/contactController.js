const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config();

const Users = require("../models/Users");
const Chats = require("../models/Chats");
const Messages = require("../models/Messages");
const Images = require("../models/Images");

// multer setup
const multer = require("multer");
// const upload = multer({ dest: "upload/" }); //for saving it locally
const upload = { storage: multer.memoryStorage() };

// cloudinary setup
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "divk7ypa9",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const cloundaryBaseUrl = process.env.CLOUDINARY_BASE_URL;

// POST add new contact
exports.add_new_contact_post = [
  body("usernameToAdd", "Username must me at least 1 character long")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.sendStatus(400);
      return;
    } else {
      // Find the user that will be added as a contact
      const [usernameToAdd, currentUser] = await Promise.all([
        Users.findOne({ username: req.body.usernameToAdd }).exec(),
        Users.findById(req.user._id).populate("contacts").exec(),
      ]);

      // Check to see if the usernameToAdd is already in the contacts array
      // checks each array object to see if any of them already === usernameToAdd.id
      const userAlreadyAdded = currentUser.contacts.some(
        (contact) => contact.id === usernameToAdd.id
      );
      if (userAlreadyAdded) {
        res.status(400).send("Contact already added");
        return;
      }

      if (usernameToAdd === null) {
        res.status(404).send("Cannot find contact to add");
      } else {
        // Push the added contact to the users contacts array
        const updatedUser = await Users.findByIdAndUpdate(req.user._id, {
          $push: { contacts: usernameToAdd },
        });

        if (updatedUser === null) {
          res.sendStatus(400);
          return;
        }

        res
          .status(200)
          .json({ message: "found the user", foundUser: true })
          .send();
      }
    }
  }),
];

// GET all contacts for current user
exports.all_contacts_for_current_user_get = asyncHandler(
  async (req, res, next) => {
    const [user, usersChats] = await Promise.all([
      Users.findById(req.user.id).populate("contacts").exec(),
      Chats.find({
        users: {
          $all: [req.user.id],
        },
      })
        .populate({
          path: "users",
          select: "username _id",
        })
        .exec(),
    ]);

    const allContacts = user.contacts;

    if (user === null) {
      console.log("user not found");
      res.sendStatus(204);
    }
    // Set up base default image
    // const baseUrl = `${req.protocol}://${req.get("host")}`;
    // const defaultImageUrl = `${baseUrl}/images/image.png`;

    // map through contacts and assign defaultImageUrl to profilePic
    // if its blank.

    // allContactsMapped = user.contacts.map((contact) => {
    //   // Check if contact has a profilePic, if not, add defaultImageUrl instead
    //   if (!contact.profilePic) {
    //     contact.profilePic = defaultImageUrl;
    //     console.log("true");
    //   }
    //   return contact;
    // });

    res.json({ allContacts, usersChats });
  }
);

// DELETE contact from user contacts
exports.delete_specific_contact = asyncHandler(async (req, res, next) => {
  const contactId = req.params.contactId;
  const userId = req.user.id;

  const user = await Users.findByIdAndUpdate(userId, {
    $pull: {
      contacts: contactId,
    },
  });

  if (user === null) {
    res.status(204).send("Can't find user.");
  }

  res.status(200).send("Contact removed from contacts");
});

exports.test = asyncHandler(async (req, res, next) => {
  res.json({ message: "working" });
});

// POST add a new profile image
exports.post_add_profile_image = asyncHandler(async (req, res, next) => {
  const image = req.file;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    // upload the image
    // Base 64 encode the file to create a data URI for the uploader
    const base64EncodedImage = Buffer.from(req.file.buffer).toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64EncodedImage}`;

    const response = await cloudinary.uploader.upload(dataUri, options);

    const clouninaryId = `https://res.cloudinary.com/divk7ypa9/image/upload/${response.public_id}`;
    const userId = req.user.id;
    // assign public_id to the user in mongoDB
    // const newImage = new Images({
    //   user: userId,
    //   imageId: clouninaryId,
    // });

    // await newImage.save();
    // const newImageId = newImage._id;

    // assign the images mongoDB id to the users profilePic property
    await Users.findByIdAndUpdate(userId, {
      $set: { profilePic: clouninaryId },
    });

    res.status(201).json({ publicId: response.public_id });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  // res.json(req.file);
});

// GET current user details
exports.get_current_user = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const userProfile = await Users.findById(userId).populate().exec();

  res.status(201).json(userProfile);
});

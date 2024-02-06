const mongoose = require("mongoose");
const Characters = require("./models/characters");
const Users = require("./models/Users");
const Messages = require("./models/Messages");
const Groups = require("./models/Groups");
require("dotenv").config();

const mongoDB = process.env.MONGODB_STRING;

// Connect to mongo db
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// User Model fields
// username: { type: String, unique: true, required: true },
// password: { type: String, required: true },
// email: { type: String, unique: true, required: true },
// messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
// Group:[{ type: mongoose.Schema.Types.ObjectId, ref: "Groups" }],

// Message model fields
// sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// receiver: {type: mongoose.Schema.Types.ObjectId, ref: "User",  required: false,},
// group: {  type: mongoose.Schema.Types.ObjectId,  ref: "Group",  required: false,},
// content: { type: String, required: true },},

// Group Model fields
// {name: { type: String, required: true },
//   members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   messages: [{ type: mongoose.Schema.Types.ObjectId, red: "Message" }],  },
// { timestamps: true, toJSON: { virtuals: true } });

// Define the data to be inserted
const userDataToInsert = [
  {username: "testuser", password: "12345", email: "test@email.com", messages}
  { character: "Waldo", found: false, pixelX: 882, pixelY: 974 },
  { character: "Wenda", found: false, pixelX: 894, pixelY: 778 },
  { character: "Wizzard", found: false, pixelX: 1342, pixelY: 988 },
  { character: "Odlaw", found: false, pixelX: 1202, pixelY: 1222 },
  // Add more documents as needed
];

const messageDataToInsert = [
  {sender: userDataToInsert[0], receiver: userDataToInsert[1] , content: "test send message"},
  {sender: userDataToInsert[1], receiver: userDataToInsert[0], content: "test reply message"},
  // {sender: , receiver: , group: , content: ""},
  // {sender: , receiver: , group: , content: ""},
  // {sender: , receiver: , group: , content: ""},
]

// Function to insert data into the database
const populateDatabase = async () => {
  try {
    // Delete existing documents (optional)
    // await YourModel.deleteMany({});

    // Insert new documents
    await Characters.insertMany(dataToInsert);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Call the function to seed the database
populateDatabase();

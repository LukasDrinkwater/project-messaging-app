console.log(
  'This script populates some test blogs, users, comments to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/Users");
const Message = require("./models/Messages");
const Group = require("./models/Groups");

const users = [];
const messages = [];
const groups = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");

  // removing any previous documents
  // console.log("removing previous documents");
  // await User.deleteMany({});
  // await Message.deleteMany({});
  // await Group.deleteMany({});
  // console.log("previous documents removed");

  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  await createUsers();
  await createMessages();
  await createGroups();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

// User Model fields
// username: { type: String, unique: true, required: true },
// password: { type: String, required: true },
// email: { type: String, unique: true, required: true },
// messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
// Group:[{ type: mongoose.Schema.Types.ObjectId, ref: "Groups" }],
async function userCreate(index, username, password, email, messages, group) {
  const user = new User({
    username: username,
    password: password,
    email: email,
    messages: messages,
    group: group,
  });

  await user.save();
  users[index] = user;
  console.log(`usermessage: ${username} ${email}`);
}

// Message model fields
// sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// receiver: {type: mongoose.Schema.Types.ObjectId, ref: "User",  required: false,},
// group: {  type: mongoose.Schema.Types.ObjectId,  ref: "Group",  required: false,},
// content: { type: String, required: true },},
async function messageCreate(index, sender, receiver, group, content) {
  const message = new Message({
    sender: sender,
    receiver: receiver,
    group: group,
    content: content,
  });

  await message.save();
  messages[index] = message;
  console.log(`Added message: ${sender} ${content}`);
}

// Group Model fields
// {name: { type: String, required: true },
//   members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   messages: [{ type: mongoose.Schema.Types.ObjectId, red: "Message" }],  },
// { timestamps: true, toJSON: { virtuals: true } });
async function groupCreate(index, name, members, messages) {
  const group = new Group({
    name: name,
    members: members,
    messages: messages,
  });

  await group.save();
  groups[index] = group;
  console.log(`Added group: ${name} ${members}`);
}

// username, password, email, messages, groups
async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "testuser", "12345", "test@email.com", [
      messages[0],
      messages[1],
    ]),
    userCreate(1, "testuser2", "12345", "test2@email.com", [
      messages[0],
      messages[1],
    ]),
  ]);
}

// index, sender, reciever, group, content
async function createMessages() {
  console.log("Adding messages");
  // console.log(users);
  // console.log(users);
  await Promise.all([
    messageCreate(0, users[0], users[1], undefined, "test send message"),
    messageCreate(1, users[1], users[0], undefined, "test reply message"),
    messageCreate(2, users[0], users[1], groups[0], "test group send message"),
    messageCreate(3, users[1], users[0], groups[0], "test group reply message"),
  ]);
}

// index, name, members,. messages
async function createGroups() {
  console.log("Adding groups");
  await Promise.all([
    groupCreate(
      0,
      "test group",
      [users[0], users[1]],
      [messages[2], messages[3]]
    ),
  ]);
}

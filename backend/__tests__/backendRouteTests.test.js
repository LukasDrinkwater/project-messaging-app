const {
  initializeMongoServer,
  disconnectMongoServer,
} = require("../__testConfig__/mongoConfigTesting");
const supertest = require("supertest");

// Import models
const Users = require("../models/Users");
const Chats = require("../models/Chats");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");

const chatRoutes = require("../routes/chatRoutes");
const authRoutes = require("../routes/authRoutes");

// setup test stuff
const request = require("supertest");
const express = require("express");
const app = express();
const server = supertest.agent(app);

app.use(express.urlencoded({ extended: false }));
const passport = require("../strategies/passportConfig"); // Import Passport configuration file
app.use(passport.session());
// app.use(passport.initialize());

app.use("/api/chats", chatRoutes);
app.use("/api/auth", authRoutes);

// initializeMongoServer();

// let mongoServer;

// // Create an agent
// const agent = supertest.agent(app);

// beforeAll(async () => {
//   // initializeMongoServer();
//   // mongoServer = await MongoMemoryServer.create();
//   // const mongoUri = mongoServer.getUri();

//   // // Connect mongoose to the in-memory database
//   // await mongoose.connect(mongoUri, {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   // });

//   const newUser = new Users({
//     username: "user1",
//     password: "12345",
//     email: "user1@email.com",
//     contacts: [],
//   });

//   const newUser2 = new Users({
//     username: "user2",
//     password: "12345",
//     email: "user2@email.com",
//     contacts: [],
//   });

//   newUser.contacts.push(newUser2._id);
//   newUser2.contacts.push(newUser._id);

//   await newUser.save();
//   await newUser2.save();

//   const newChat = new Chats({
//     users: [newUser._id, newUser2._id],
//   });

//   const newMessage = new Messages({
//     sender: newUser._id,
//     chat: newChat._id,
//     content: "message for testing",
//   });

//   newMessage.chat = newChat._id;

//   await newChat.save();
//   await newMessage.save();

//   // Setup cookie with supertest agent

//   // await agent
//   //   .post("/api/auth/login") // Replace with your login route
//   //   .send({ username: "user1", password: "12345", id: newUser._id }) // Replace with valid credentials
//   //   .expect(200);
//   // done();
// });

// afterAll(async () => {
//   await disconnectMongoServer();
// });

// function to login
const loginUser = () => {
  return (done) => {
    server
      .post("/api/auth/login")
      .send({ username: "user1", password: "12345" })
      .expect(200)
      .end(onResponse);

    const onResponse = (err, res) => {
      if (err) return done(err);
      return done();
    };
  };
};

test("test that the test route is working", (done) => {
  request(app)
    .get("/api/chats/testing")
    .expect("Content-Type", /json/)
    .expect({ message: "test route working" })
    .expect(200, done);
});

// Test getting users chats
describe("GET all user chats and a specific chat", () => {
  it("login", loginUser());
  it("responds with json", (done) => {
    request(app)
      .get("/api/chats/all-users-chats")
      .expect("Content-Type", /json/)
      .expect((res) => {
        // check id the response have allChats
        if (!("allChats" in res.body)) {
          throw new Error("Response does not include allChats");
        }
      })
      .expect(200, done);
  });
});

// const isIncludeField = function (fieldName) {
//   return function (res) {
//     res.body.should.have.property(fieldName);
//   };
// }

// describe('GET category', function () {
//   it('response w/ only injury returned', function () {
//     request('endpoint')
//       .get('path')
//       .set('header', 'token')
//       .expect(200)
//       .expect(isIncludeField('Baseball')) //
//       .end(done); // call done callback
//   })
// });

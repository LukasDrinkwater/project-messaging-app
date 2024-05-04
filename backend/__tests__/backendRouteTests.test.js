const {
  initializeMongoServer,
  disconnectMongoServer,
} = require("../__testConfig__/mongoConfigTesting");
const supertest = require("supertest");
const session = require("express-session");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import models
const Users = require("../models/Users");
const Chats = require("../models/Chats");
const Messages = require("../models/Messages");
const Groups = require("../models/Groups");

const chatRoutes = require("../routes/chatRoutes");
const authRoutes = require("../routes/authRoutes");
const messageRoutes = require("../routes/messageRoutes");

// setup test stuff
const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());
// const server = supertest.agent(app);

app.use(express.urlencoded({ extended: false }));
app.use(
  //cors is needed to allow requests from the React front end
  cors({
    origin: ["*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const SECRET_STRING = process.env.SECRET_STRING;
app.use(
  session({ secret: SECRET_STRING, resave: false, saveUninitialized: true })
);
const passport = require("../strategies/passportConfig"); // Import Passport configuration file
app.use(passport.session());
app.use(passport.initialize());

app.use("/api/chats", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// custom error handler to get more information
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

initializeMongoServer();

let newChat;
let cookies;
let newGroup;

// Create an agent
const agent = supertest.agent(app);

beforeAll(async () => {
  // initializeMongoServer();
  // mongoServer = await MongoMemoryServer.create();
  // const mongoUri = mongoServer.getUri();

  // // Connect mongoose to the in-memory database
  // await mongoose.connect(mongoUri, {_
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  try {
    const newUser = new Users({
      username: "user1",
      password: "12345",
      email: "user1@email.com",
      contacts: [],
    });

    const newUser2 = new Users({
      username: "user2",
      password: "12345",
      email: "user2@email.com",
      contacts: [],
    });

    newUser.contacts.push(newUser2._id);
    newUser2.contacts.push(newUser._id);

    await newUser.save();
    await newUser2.save();

    newChat = new Chats({
      users: [newUser._id, newUser2._id],
    });

    newGroup = new Groups({
      name: "test group",
      users: [newUser._id, newUser2._id],
    });

    const newMessage = new Messages({
      sender: newUser._id,
      chat: newChat._id,
      content: "message for testing",
    });

    newMessage.chat = newChat._id;

    newChat.lastMessage = newMessage.content;

    await newChat.save();
    await newGroup.save();
    await newMessage.save();
  } catch (err) {
    console.log(err);
  }
  // Setup cookie with supertest agent

  // await agent
  await agent
    .post("/api/auth/login")
    .send({ username: "user1", password: "12345" })
    .expect(200);
});

afterAll(async () => {
  await disconnectMongoServer();
});

// function to login
// const loginUser = () => {
//   return (done) => {
//     server
//       .post("/api/auth/login")
//       .send({ username: "user1", password: "12345" })
//       .expect(200)
//       .end(onResponse);

//     const onResponse = (err, res) => {
//       if (err) return done(err);
//       return done();
//     };
//   };
// };

test("test that the test route is working", (done) => {
  request(app)
    .get("/api/chats/testing")
    .expect("Content-Type", /json/)
    .expect({ message: "test route working" })
    .expect(200, done);
});

// Test getting users chats
describe("GET all user chats and a specific chat", () => {
  it("responds with json and includes allChats", async () => {
    const res = await agent.get("/api/chats/all-users-chats");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("allChats");
  });
});
// The above can also be done like this
// describe("GET all user chats and a specific chat", () => {
//   it("responds with json and includes allChats", (done) => {
//     agent
//       .get("/api/chats/all-users-chats")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .expect((res) => {
//         if (!("allChats" in res.body)) {
//           throw new Error("Response does not include allChats");
//         }
//       })
//       .end(done);
//   });
// });

describe("GET all user chats and a specific chat", () => {
  it("responds with json", async () => {
    const res = await agent.get("/api/chats/all-users-chats");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("allChats");
  });
  it("responds with a specific chat", async () => {
    const res = await agent.get(`/api/chats/${newChat._id.toString()}`);
    expect(res.body).toHaveProperty("chatMessages");
    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("contact");
  });
  it("Test check if already logged in", async () => {
    const res = await agent.get("/api/auth/check-auth").expect(200);
  });
});

describe("Test message posting", () => {
  it("POST a new message to a chat", async () => {
    // newMessage is sent as the body of the req.
    const newMessage = {
      chatId: newChat._id,
      content: "test message",
    };

    const res = await agent
      .post(`/api/message/new-message`)
      .send(newMessage) //Add the body by doing .send
      .expect(201);
  });

  it("POST a new message to a group", () => {
    // newMessage is sent as the body of the req.
    const newMessage = {
      groupId: newGroup._id,
      content: "test group message",
    };

    agent.post("/api/message/new-group-message").send(newMessage).expect(201);
  });
});

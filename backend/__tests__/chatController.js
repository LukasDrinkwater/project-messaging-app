const chatRoutes = require("../routes/chatRoutes");

// setup test stuff
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/api/chats", chatRoutes);

test("test that the test route is working", (done) => {
  request(app)
    .get("/api/chats/testing")
    .expect("Content-Type", /json/)
    .expect({ message: "test route working" })
    .expect(200, done);
});

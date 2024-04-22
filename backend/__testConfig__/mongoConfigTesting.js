require("dotenv").config();

//// mongoConfigTesting.js
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

async function initializeMongoServer() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}

async function disconnectMongoServer() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log("Disconnected from MongoDB server");
  }
}

module.exports = { initializeMongoServer, disconnectMongoServer };

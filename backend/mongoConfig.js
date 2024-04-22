require("dotenv").config();
// Setup mongoose mongoDB connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_STRING;

main().catch((error) => console.log(error));
async function main() {
  await mongoose.connect(mongoDB);
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
console.log(mongoose.connection.readyState);

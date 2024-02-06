const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

// Test API GET
exports.test_check = asnycHandler(async (req, res, next) => {
  console.log(res);
  res.json({ message: "hey im a test reponse" }).statusCode(200).send();
});

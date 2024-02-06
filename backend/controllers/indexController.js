const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");

// Test API GET
exports.test_get = asnycHandler(async (req, res, next) => {
  res.json({ message: "hey im a test reponse" }).statusCode(200).send();
});

exports.test_get_post = asnycHandler(async (req, res, next) => {
  console.log(req.body);
  res.json({ message: "hey im a test reponse" }).statusCode(200).send();
});

const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

// GET test reponse
router.get("/test", indexController.test_get);
router.post("/test", indexController.test_get_post);

module.exports = router;

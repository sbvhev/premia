const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

router.use("/auth", auth);

module.exports = router;

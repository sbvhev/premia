const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares");

router.post("/login", authController.login);
router.post("/signup", authController.signUp);
router
  .route("/updateprofile")
  .put(authMiddleware, authController.updateProfile);

module.exports = router;

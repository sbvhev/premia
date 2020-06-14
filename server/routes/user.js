const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const permissions = require("../utils");

router.use(permissions.hasRole(["admin"]));

router
  .route("/")
  .get(userController.list)
  .post(userController.create);

router
  .route("/:id")
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;

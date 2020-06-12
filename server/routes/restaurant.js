const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router
  .route("/")
  .get(restaurantController.list)
  .post(restaurantController.post);

router
  .route("/:id")
  .put(restaurantController.update)
  .delete(restaurantController.remove);

module.exports = router;

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router
  .route("/restaurants/:id/reviews")
  .get(reviewController.read)
  .post(reviewController.create);

router
  .route("/restaurants/reviews/:id")
  .put(reviewController.update)
  .delete(reviewController.remove);

module.exports = router;

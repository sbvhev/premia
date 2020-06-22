const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    overall_rating: { type: Number, required: false },
    highest_rating: { type: Number, required: false },
    lowest_rating: { type: Number, required: false },
    reviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "review", required: false }
    ]
  },
  { versionKey: false }
);

module.exports = mongoose.model("restaurant", RestaurantSchema);

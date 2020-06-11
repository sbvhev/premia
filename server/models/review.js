const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  from_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  rate: { type: Number, required: false },
  comment: { type: String, required: false },
  reply: { type: String, required: false },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("review", ReviewSchema);

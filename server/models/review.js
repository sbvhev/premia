const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    rate: { type: Number, required: true },
    comment: { type: String, required: true },
    reply: { type: String, required: false },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true
    },
    date: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("review", ReviewSchema);

const Review = require("../models/review");
const Restaurant = require("../models/restaurant");
const _ = require("lodash");

async function read(req, res, next) {
  try {
    const { page = 1, limit = 5 } = req.query;
    const { id } = req.params;
    const user = req.user;

    let restaurant;
    if (user.role === "owner") {
      restaurant = await Restaurant.findOne({ _id: id, user: user }).populate(
        "reviews"
      );
    } else {
      restaurant = await Restaurant.findOne({ _id: id }).populate("reviews");
    }
    if (restaurant == null) {
      return res.status(400).send({
        error: "The restaurant doesn't exist"
      });
    }
    res.send({
      name: restaurant.name,
      reviews: restaurant.reviews.slice(
        parseInt(page - 1) * parseInt(limit),
        parseInt(page - 1) * parseInt(limit) + parseInt(limit)
      ),
      count: restaurant.reviews.length
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { id, rate, comment } = req.body;
    const { user } = req;
    if (user.role === "owner") {
      return res.status(403).json({
        message: "You're not authorized to leave a comment."
      });
    }
    const restaurant = await Restaurant.findOne({ _id: id });
    if (restaurant == null) {
      return res.status(400).send({
        message: "Restaurant doesn't exist"
      });
    }
    const newReview = new Review({
      from_user: user,
      rate: rate,
      comment: comment,
      restaurant: id,
      reply: ""
    });

    const review = await newReview.save();

    restaurant.reviews.push(review);
    if (restaurant.highest_rating < review.rate)
      restaurant.highest_rating = review.rate;
    if (
      restaurant.reviews.length === 1 ||
      restaurant.lowest_rating > review.rate
    )
      restaurant.lowest_rating = review.rate;
    restaurant.overall_rating =
      (restaurant.overall_rating * (restaurant.reviews.length - 1) +
        review.rate) /
      restaurant.reviews.length;
    await restaurant.save();

    res.send({ review: review });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  const { id } = req.params;
  const { reply, comment, rate } = req.body;
  const user = req.user;
  if (
    user.role === "regular" ||
    (user.role === "owner" && typeof rate != "undefined")
  ) {
    return res.status(403).json({
      message: "You're not authorized to update the review."
    });
  }
  let previous = 0;
  const review = await Review.findOne({ _id: id }).populate("restaurant");

  console.log("review: ", review);
  if (review == null) {
    return res.status(400).send({
      message: "Review doesn't exist"
    });
  }
  if (typeof comment != "undefined") review.comment = comment;
  if (typeof rate != "undefined") {
    previous = review.rate;
    review.rate = rate;
  }
  if (user.role == "owner" && review.reply.length > 0) {
    return res.status(400).send({
      message: "Owners can only reply once."
    });
  }
  review.reply = reply;
  await review.save();
  if (typeof rate != "undefined")
    Restaurant.findOne({ _id: review.restaurant._id }, (err, restaurant) => {
      if (restaurant == null) {
        return res.status(400).send({
          message: "Restaurant doesn't exist"
        });
      }
      if (restaurant.highest_rating < rate) restaurant.highest_rating = rate;
      if (restaurant.lowest_rating > rate) restaurant.lowest_rating = rate;
      restaurant.overall_rating =
        (restaurant.overall_rating * restaurant.reviews.length -
          previous +
          rate) /
        restaurant.reviews.length;
      restaurant.save();
    });

  return res.send({ review: review });
}

async function remove(req, res, next) {
  const { id } = req.params;
  console.log(id);
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({
      message: "You're not authorized to remove review."
    });
  }
  const review = await Review.findOne({ _id: id }).populate("restaurant");
  if (review == null) {
    return res.status(400).send({
      message: "Review doesn't exist"
    });
  }
  await Review.deleteOne({ _id: id });
  Restaurant.findOne({ _id: review.restaurant._id })
    .populate("reviews")
    .exec(async (err, restaurant) => {
      if (restaurant == "null") {
        return res.status(400).send({
          message: "Restaurant doesn't exist."
        });
      }
      if (typeof restaurant != "undefined") {
        restaurant.reviews = restaurant.reviews.filter(
          review => review._id != id
        );
        let sum = 0;
        if (restaurant.reviews.length === 0) {
          restaurant.overall_rating = 0;
          restaurant.highest_rating = 0;
          restaurant.lowest_rating = 0;
        } else {
          let lowest = 5,
            highest = 0;
          for (let i = 0; i < restaurant.reviews.length; i++) {
            if (restaurant.reviews[i].rate > highest)
              highest = restaurant.reviews[i].rate;
            if (restaurant.reviews[i].rate < lowest)
              lowest = restaurant.reviews[i].rate;
            sum += restaurant.reviews[i].rate;
          }
          restaurant.overall_rating = sum / restaurant.reviews.length;
          restaurant.highest_rating = highest;
          restaurant.lowest_rating = lowest;
        }
        await restaurant.save();
        res.send({
          status: "ok"
        });
      }
    });
}

module.exports = {
  read,
  create,
  update,
  remove
};

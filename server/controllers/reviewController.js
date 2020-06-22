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
      return res.status(422).send({
        message:
          "We can not find this restaurant for this req user. Maybe you need to try with another role token or correct restaruant id."
      });
    }

    if (
      !_.isInteger(_.toNumber(page)) ||
      !_.isInteger(_.toNumber(limit)) ||
      _.toNumber(page) <= 0 ||
      _.toNumber(limit) <= 0
    ) {
      return res
        .status(422)
        .send({ message: "Page and limit must be positive integer." });
    }

    res.send({
      name: restaurant.name,
      reviews:
        user.role === "regular"
          ? restaurant.reviews
              .filter(a => a.from_user == user._id)
              .sort((a, b) => a.date < b.date)
              .slice(
                parseInt(page - 1) * parseInt(limit),
                parseInt(page - 1) * parseInt(limit) + parseInt(limit)
              )
          : restaurant.reviews
              .sort((a, b) => a.date < b.date)
              .slice(
                parseInt(page - 1) * parseInt(limit),
                parseInt(page - 1) * parseInt(limit) + parseInt(limit)
              ),
      count:
        user.role === "regular"
          ? restaurant.reviews.filter(a => a.from_user == user._id).length
          : restaurant.reviews.length
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { rate = 0, comment, reply } = req.body;
    const { id } = req.params;
    const { user } = req;

    if (user.role === "owner") {
      return res.status(403).send({
        message: "You're not authorized to add a review."
      });
    }

    if (
      _.isNaN(_.toNumber(rate)) ||
      _.toNumber(rate) < 0 ||
      _.toNumber(rate) > 5
    )
      return res
        .status(400)
        .send({ message: "Rate should be number between 0 and 5" });

    if (!comment)
      return res.status(400).send({ message: "comment is required" });

    const restaurant = await Restaurant.findOne({ _id: id });
    if (!restaurant) {
      return res.status(400).send({
        message: "Restaurant doesn't exist"
      });
    }

    if (user.role === "regular") {
      const reviews = await Review.find({
        restaurant: id,
        from_user: user._id
      });

      if (reviews.length >= 1) {
        return res.status(422).send({
          message: "Regular users can only comment once"
        });
      }
    }
    const newReview = new Review({
      from_user: user,
      rate: rate,
      comment: comment,
      restaurant: id,
      reply: user.role === "admin" ? reply : ""
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

    res.status(201).send({ review: review });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  const { id } = req.params;
  const { reply, comment, rate } = req.body;
  const user = req.user;

  if (user.role === "regular") {
    return res.status(403).send({
      message: "You're not authorized to update the review."
    });
  }

  if (_.isUndefined(rate) && user.role === "admin") {
    return res.status(400).send({ message: "Rate is required in admin view" });
  }

  if (_.isUndefined(reply) && user.role === "owner") {
    return res.status(400).send({ message: "Reply is required in owner view" });
  }

  if (_.isUndefined(comment) && user.role === "admin") {
    return res
      .status(400)
      .send({ message: "Comment is required in admin view" });
  }

  if (
    (_.isNaN(_.toNumber(rate)) ||
      _.toNumber(rate) < 0 ||
      _.toNumber(rate) > 5) &&
    user.role === "admin"
  )
    return res
      .status(400)
      .send({ message: "Rate should be number between 0 and 5" });

  let previous = 0;
  const review = await Review.findOne({ _id: id }).populate(
    "restaurant",
    "-reviews -overall_rating -highest_rating -lowest_rating -name -user"
  );

  if (review == null) {
    return res.status(400).send({
      message: "Review doesn't exist"
    });
  }

  if (user.role == "owner" && review.reply && review.reply.length > 0) {
    return res.status(422).send({
      message: "Owners can only reply once."
    });
  }

  if (user.role === "admin") {
    if (!_.isNaN(comment)) review.comment = comment;

    if (!_.isNaN(rate)) {
      previous = review.rate;
      review.rate = rate;
    }
  }

  review.reply = reply;
  await review.save();

  if (!_.isNaN(rate) && user.role === "admin") {
    Restaurant.findOne(
      { _id: review.restaurant._id },
      async (err, restaurant) => {
        if (restaurant == null) {
          return res.status(400).send({
            message: "Restaurant doesn't exist"
          });
        }

        let highestOne = 0,
          lowestOne = 100,
          sumOne = 0;
        for (let i = 0; i < restaurant.reviews.length; i++) {
          const r = await Review.findOne({ _id: restaurant.reviews[i] });
          if (r.rate > highestOne) highestOne = r.rate;
          if (r.rate < lowestOne) lowestOne = r.rate;
          sumOne += r.rate;
        }

        restaurant.highest_rating = highestOne;
        restaurant.lowest_rating = lowestOne;
        restaurant.overall_rating = sumOne / restaurant.reviews.length;
        await restaurant.save();
        return res.send({ review: review });
      }
    );
  } else {
    return res.send({ review: review });
  }
}

async function remove(req, res, next) {
  const { id } = req.params;
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).send({
      message: "You're not authorized to remove review."
    });
  }
  const review = await Review.findOne({ _id: id }).populate("restaurant");
  if (!review) {
    return res.status(400).send({
      message: "Review doesn't exist"
    });
  }
  await Review.deleteOne({ _id: id });
  await Restaurant.update(
    { _id: review.restaurant._id },
    { $pull: { reviews: id } }
  );
  Restaurant.findOne({ _id: review.restaurant._id })
    .populate("reviews")
    .exec(async (err, restaurant) => {
      console.log(restaurant);
      if (!restaurant) {
        return res.status(400).send({
          message: "Restaurant doesn't exist."
        });
      }
      if (!_.isUndefined(restaurant)) {
        if (restaurant.reviews.length === 0) {
          restaurant.overall_rating = 0;
          restaurant.highest_rating = 0;
          restaurant.lowest_rating = 0;
        } else {
          let highestOne = 0,
            lowestOne = 100,
            sumOne = 0;
          for (let i = 0; i < restaurant.reviews.length; i++) {
            const r = await Review.findOne({ _id: restaurant.reviews[i] });
            if (r.rate > highestOne) highestOne = r.rate;
            if (r.rate < lowestOne) lowestOne = r.rate;
            sumOne += r.rate;
          }

          restaurant.highest_rating = highestOne;
          restaurant.lowest_rating = lowestOne;
          restaurant.overall_rating = sumOne / restaurant.reviews.length;
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

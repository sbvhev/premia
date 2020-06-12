const { Restaurant } = require("../models/restaurant");
const _ = require("lodash");

async function post(req, res, next) {
  try {
    let { name = "" } = req.body || {};
    const { user } = req;

    if (!name) {
      return res.status(400).json({
        message: "Name is required."
      });
    }

    if (user.role === "regular") {
      return res.status(403).json({
        message: "You're not authorized to create a restaurant."
      });
    }

    const rest = await Restaurant.findOne({ name });
    if (rest) {
      return res.status(409).json({
        message: "Restaurant already exists with same name."
      });
    }

    const restaurant = await Restaurant.create({
      name: name,
      user: user,
      overall_rating: 0,
      highest_rating: 0,
      lowest_rating: 0,
      reviews: []
    });

    return res.send({ restaurant });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    let { min = 0, max = 5, page = 1, limit = 5 } = req.query;
    const { user } = req;
    if (min > max) {
      res.status(400).json({
        message: "Max value should be more than min value."
      });
      return;
    }

    let where = {};
    where["overall_rating"] = { $gte: min, $lte: max };
    const count = await Restaurant.countDocuments(where);

    let restaurants;
    if (user.role === "owner") {
      restaurants = await Restaurant.find({
        overall_rating: { $gte: min, $lte: max },
        user: user._id
      })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort([["overall_rating", -1]])
        .exec();
    } else {
      restaurants = await Restaurant.find({
        overall_rating: { $gte: min, $lte: max }
      })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort([["overall_rating", -1]])
        .exec();
    }

    return res.send({
      restaurants,
      count
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { name = "" } = req.body;

    if (!name) {
      return res.status(400).send({
        message: "Restaurant name required."
      });
    }
    const exist = await Restaurant.find({ name: name });
    if (exist.length != 0 && id != exist[0]._id) {
      return res.status(409).send({
        message: "Restaurant already exists with same name"
      });
    } else {
      await Restaurant.findOne({ _id: id }, async (err, restaurant) => {
        restaurant.name = name;
        await restaurant.save();
        return res.send({
          restaurant: restaurant
        });
      });
    }
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You're not authroized to remove the restaurant."
      });
    }
    const restaurant = await Restaurant.findOne({ _id: id });
    if (!restaurant) {
      return res.status(400).send({
        message: "Restaurant doesn't exist."
      });
    }
    restaurant.review.map(async review => {
      await Restaurant.deleteOne({ _id: review });
    });
    const remove = await Restaurant.deleteOne({ _id: id });
    return res.send({
      result: remove
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  post,
  list,
  update,
  remove
};

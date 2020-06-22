const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;
const _ = require("lodash");

async function post(req, res, next) {
  try {
    let { name = "", user: reqUser = null } = req.body || {};
    const { user } = req;

    if (!name) {
      return res.status(400).send({
        message: "Name is required."
      });
    }

    if (user.role === "regular") {
      return res.status(403).send({
        message: "You're not authorized to create a restaurant."
      });
    }

    const rest = await Restaurant.findOne({ name });
    if (rest) {
      return res.status(409).send({
        message: "Restaurant already exists with same name."
      });
    }

    if (!ObjectId.isValid(reqUser) && user.role === "admin") {
      return res.status(400).send({
        message: "User ID is not valid id."
      });
    }

    const existUser = await User.findOne({
      _id: ObjectId(reqUser),
      role: "owner"
    });

    if (!existUser && user.role === "admin") {
      return res
        .status(422)
        .send({ message: "Restaurant is authorized to only owners" });
    }

    const restaurant = await Restaurant.create({
      name: name,
      user: user.role === "admin" ? ObjectId(reqUser) : user,
      overall_rating: 0,
      highest_rating: 0,
      lowest_rating: 0,
      reviews: []
    });

    return res.status(201).send({ restaurant });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    let { min = 0, max = 5, page = 1, limit = 5 } = req.query;

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

    const { user } = req;
    if (min > max) {
      res.status(400).send({
        message: "Max value should be more than min value."
      });
      return;
    }

    let where = {};
    where["overall_rating"] = { $gte: min, $lte: max };
    if (user.role === "owner") {
      where["user"] = ObjectId(user._id);
    }
    const count = await Restaurant.countDocuments(where);

    let restaurants;
    if (user.role === "owner") {
      restaurants = await Restaurant.find({
        overall_rating: { $gte: min, $lte: max },
        user: user._id
      })
        .skip(parseInt(page - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .populate("user", "-password -passwordConfirm")
        .sort([["overall_rating", -1]])
        .exec();
    } else {
      restaurants = await Restaurant.find({
        overall_rating: { $gte: min, $lte: max }
      })
        .skip(parseInt(page - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .populate("user", "-password -passwordConfirm")
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
    const { name = "", user } = req.body;
    const { user: reqUser } = req;

    if (reqUser.role !== "admin")
      return res
        .status(403)
        .send({ message: "You are not authorized to update restaruant" });

    if (!name) {
      return res.status(400).send({
        message: "Restaurant name is required."
      });
    }

    if (!user) {
      return res.status(400).send({
        message: "User is required."
      });
    }

    if (!ObjectId.isValid(user)) {
      return res.status(400).send({
        message: "User ID is not valid id."
      });
    }

    const existUser = await User.findOne({ _id: user, role: "owner" });
    if (!existUser && reqUser.role === "admin") {
      return res
        .status(409)
        .send({ message: "Restaurant is authorized to only owners" });
    }

    await Restaurant.findOne({ _id: id }, async (err, restaurant) => {
      restaurant.name = name;
      restaurant.user = user;
      await restaurant.save();
      return res.send({
        restaurant: restaurant
      });
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const user = req.user;

    if (user.role !== "admin") {
      return res.status(403).send({
        message: "You're not authroized to remove the restaurant."
      });
    }
    const restaurant = await Restaurant.findOne({ _id: id });
    if (!restaurant) {
      return res.status(400).send({
        message: "Restaurant doesn't exist."
      });
    }
    await Review.deleteMany({ restaurant: id });
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

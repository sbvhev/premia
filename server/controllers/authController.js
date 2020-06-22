const { pick, get, assign } = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const { createValidate, updateValidate } = require("../utils");

async function login(req, res, next) {
  try {
    const { email = "", password = "" } = req.body || {};

    if (!email) {
      return res.status(400).send({ message: "Email is empty." });
    } else if (!password) {
      return res.status(400).send({ message: "Password is required." });
    }

    const user = await User.findOne({ email: req.body.email })
      .select("_id password email firstName lastName role")
      .exec();

    if (!user) {
      return res.status(401).send({
        message: "Can not find user matched with credential"
      });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = user.getAuthToken();

      res.json({
        info: pick(user, ["_id", "firstName", "lastName", "email", "role"]),
        token
      });
    } else {
      res.status(401).send({ message: "Password is incorrect." });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    next(error);
  }
}

async function signUp(req, res, next) {
  try {
    const { error } = createValidate(req.body);
    const { role } = req.body || {};

    if (error)
      return res.status(400).send({
        message: get(error, "details.0.message", "Something went wrong.")
      });

    let user = await User.findOne({ email: req.body.email });

    if (role === "admin") {
      return res.status(400).send({ message: "Can not sign up as admin" });
    }

    if (user)
      return res.status(409).send({ message: "User already registered." });

    user = new User(
      pick(req.body, [
        "firstName",
        "lastName",
        "email",
        "password",
        "passwordConfirm",
        "role"
      ])
    );

    const newUser = await user.save();

    res.status(201).send({
      user: pick(newUser, ["firstName", "lastName", "email", "_id", "role"])
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { error } = updateValidate(req.body);

    if (error)
      return res.status(400).send({
        message: get(error, "details.0.message", "Something went wrong.")
      });

    const user = await User.findOne({ _id: req.user._id });
    const where = {
      email: req.body.email,
      _id: { $ne: req.user._id }
    };
    const exist = await User.find(where);

    if (exist.length) {
      return res.status(409).send({ message: "Same email already exists" });
    }
    assign(user, req.body, { role: get(req.user, "role", "regular") });
    const updatedUser = await user.save();
    const token = updatedUser.getAuthToken();

    res.json({
      info: pick(updatedUser, [
        "_id",
        "firstName",
        "lastName",
        "email",
        "role"
      ]),
      token
    });
  } catch (error) {
    next(error);
  }
}

async function removeProfile(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });

    await Review.deleteMany({ from_user: user._id });
    await Restaurant.deleteMany({ user: user._id });

    user.deleteOne();

    res.send({
      message: "Profile is removed"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  signUp,
  updateProfile,
  removeProfile
};

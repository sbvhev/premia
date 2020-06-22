const { isInteger, toNumber, pick, get } = require("lodash");

const User = require("../models/user");
const { createValidate, updateValidate } = require("../utils");
const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

function read(req, res, next) {
  res.json(req.user);
}

async function list(req, res, next) {
  try {
    const { page = 1, limit = 5, all = false, role = "" } = req.query;

    const where = { _id: { $ne: req.user._id } };
    const count = await User.countDocuments(where);

    if (
      !isInteger(toNumber(page)) ||
      !isInteger(toNumber(limit)) ||
      toNumber(page) <= 0 ||
      toNumber(limit) <= 0
    ) {
      return res
        .status(422)
        .send({ message: "Page and limit must be positive integer." });
    }

    if (!["", "admin", "owner", "regular"].includes(role)) {
      return res
        .status(400)
        .send({ message: "Role should be admin, owner, or regular " });
    }

    if (role) {
      where["role"] = role;
    }

    let users;
    if (all) {
      where["role"] = "owner";
      users = await User.find(where)
        .select("-password -passwordConfirm")
        .sort("-role");
    } else {
      users = await User.find(where)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .select("-password -passwordConfirm")
        .sort("-role");
    }

    res.json({ users, count });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { error } = createValidate(req.body);

    if (error)
      return res.status(400).send({
        message: get(error, "details.0.message", "Something went wrong.")
      });

    let exist = await User.findOne({ email: req.body.email });

    if (exist)
      return res.status(409).send({ message: "User already registered." });

    const user = new User(req.body);

    const newUser = await user.save();

    res
      .status(201)
      .send(pick(newUser, ["firstName", "lastName", "email", "_id", "role"]));
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { error } = updateValidate(req.body);
    const { id } = req.params;

    if (error)
      return res.status(400).send({
        message: get(error, "details.0.message", "Something went wrong.")
      });

    const exist = await User.findOne({
      _id: id
    });

    Object.assign(exist, req.body);

    const updatedUser = await exist.save();

    res.json(
      pick(updatedUser, ["firstName", "lastName", "email", "_id", "role"])
    );
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const user = req.user;
    if (user.role !== "admin") {
      res.status(403).send({
        error: "You're not authorized to remove user."
      });
      return;
    }
    await User.findOne({ _id: id }, async (err, user) => {
      if (user == null) {
        res.status(400).send({
          error: "User doesn't exist"
        });
      }
      await Review.deleteMany({ from_user: user._id });
      await Restaurant.deleteMany({ user: user._id });
      user.delete();
    });
    res.send({
      status: "ok"
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  update,
  read,
  list,
  remove
};

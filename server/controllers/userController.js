const { isInteger, toNumber, pick, get } = require("lodash");

const { User, createValidate, updateValidate } = require("../models/user");

const Restaurant = require("../models/restaurant");

function read(req, res, next) {
  res.json(req.userModel);
}

async function list(req, res, next) {
  try {
    const { page = 1, limit = 5 } = req.query;

    const where = { _id: { $ne: req.user._id } };

    if (!isInteger(toNumber(page)) || !isInteger(toNumber(limit))) {
      return res
        .status(422)
        .send({ message: "Page and rows per page must be positive integer." });
    }

    const users = await User.find(where)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select("-password -passwordConfirm")
      .sort("-role");

    res.json({ users });
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

    res.json(
      pick(newUser, [
        "firstName",
        "lastName",
        "email",
        "_id",
        "role",
        "preferredWorkingHours"
      ])
    );
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { error } = updateValidate(req.body);

    if (error)
      return res.status(400).send({
        message: get(error, "details.0.message", "Something went wrong.")
      });

    let exist = await User.findOne({
      email: req.body.email,
      _id: { $ne: req.userModel._id }
    });

    if (exist)
      return res.status(409).send({ message: "User already registerd." });

    Object.assign(req.userModel, req.body);

    const updatedUser = await req.userModel.save();

    res.json(
      pick(updatedUser, [
        "firstName",
        "lastName",
        "email",
        "_id",
        "role",
        "preferredWorkingHours"
      ])
    );
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  await Restaurant.remove({ user: req.userModel._id });

  await req.userModel.remove();

  res.json({ id: req.userModel._id });
}

async function getSpecificUser(req, res, next, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "Not found." });
    }

    req.userModel = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  getSpecificUser
};

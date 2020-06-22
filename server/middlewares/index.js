const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const header = req.headers["x-access-token"] || req.headers["authorization"];

  if (!header)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });

  const token = header.split(" ");

  if (!token[1])
    return res
      .status(401)
      .send({ message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token[1], "secret");
    const user = await User.findById({ _id: decoded._id });

    if (!user)
      return res
        .status(401)
        .send({ message: "Token is provided. But it's invalid one." });
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};

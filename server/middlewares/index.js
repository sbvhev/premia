const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
};

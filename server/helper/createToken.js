const jwt = require("jsonwebtoken");

exports.createToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

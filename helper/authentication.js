// authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware for user authentication
exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.session.user;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No session token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    req.user = user;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid session token" });
  }
};

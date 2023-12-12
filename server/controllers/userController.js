const { createToken } = require("../helper/createToken");
const User = require("../models/userModel");

exports.createNewUser = async (req, res) => {
  console.log("Received request body:", req.body);

  const { email, username, password } = req.body;

  try {
    const isFound = await User.findOne({ email });
    if (isFound) return res.send("this user is already register");
    const user = await User.create({ email, username, password });
    res.json({ user });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// Get user activity logs
exports.getUserActivityLogs = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const activityLogs = user.getActivityLogs();
    res.json({ activityLogs });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ email }).select("+password");

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = createToken(user._id);
    req.session.user = token;
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

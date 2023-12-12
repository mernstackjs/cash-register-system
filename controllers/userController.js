const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const newUser = await User.create({ username, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

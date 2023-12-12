const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["cashier", "manager"],
    default: "cashier",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    select: false,
  },
  verifyTokenExpire: {
    type: Date,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpire: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Additional fields
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  postalCode: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  preferences: {
    theme: String,
    notifications: Boolean,
  },
  activityLogs: [
    {
      timestamp: { type: Date, default: Date.now },
      action: String,
    },
  ],
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// Compare provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate a verification token
userSchema.methods.generateVerifyToken = function () {
  this.verifyToken = crypto.randomBytes(32).toString("hex");
  this.verifyTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 24 hours
};

// Generate a reset password token
userSchema.methods.generateResetPasswordToken = function () {
  this.resetPasswordToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordExpire = Date.now() + 1 * 60 * 60 * 1000; // Token expires in 1 hour
};

userSchema.methods.getActivityLogs = function () {
  return this.activityLogs;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

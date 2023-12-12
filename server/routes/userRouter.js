const {
  createNewUser,
  getUserActivityLogs,
  loginUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/create-new-user", createNewUser);
router.post("/login", loginUser);
// Get user activity logs
router.get("/users/:userId/activity-logs", getUserActivityLogs);
module.exports = router;

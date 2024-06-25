const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
  logoutUser,
} = require("../controllers/user.controllers.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/users", getUsers);
router.get("/current-user/:email", getCurrentUser);

module.exports = router;

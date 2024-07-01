const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  getUsers,
  getUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/user.controllers.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.get("/current-user/:email", getCurrentUser);

router.put("/update/:id", updateUser);

module.exports = router;

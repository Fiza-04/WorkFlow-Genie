const express = require("express");
const {
  registerUser,
  loginUser,
  // tokenHandling,
  // createToken,
} = require("../controllers/user.controllers.js");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

module.exports = router;

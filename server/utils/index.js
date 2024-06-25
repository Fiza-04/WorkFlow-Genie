const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models.js");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connection established");
  } catch (error) {
    console.log("DB error: ", error);
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = { dbConnection, authMiddleware };

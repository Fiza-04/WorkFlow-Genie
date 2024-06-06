const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connection established");
  } catch (error) {
    console.log("DB error: ", error);
  }
};

// const createJWT = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JSON_WEB_TOKEN, {
//     expiresIn: "1d",
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "strict", //prevent CSRF attack
//     maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
//   });
// };

module.exports = { dbConnection };

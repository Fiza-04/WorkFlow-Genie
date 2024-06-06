require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.models.js");

const registerUser = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    });

    res.json({
      status: true,
      user: true,
      message: "User created Successfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, user: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return { status: "error", error: "Nosuch User Found!" };
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" } // Token expiry time
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.json({
        status: "ok",
        user: token,
        message: "User Logged In Successfully",
      });
    } else {
      return res.json({
        status: "error",
        user: false,
        message: "Invalid Email or Password!",
      });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// const tokenHandling = async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });

//     return res.json({ status: "ok", token: user.token });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "Invalid token" });
//   }
// };

// const createToken = async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     const email = decoded.email;
//     await User.updateOne({ email: email }, { $set: { token: req.body.token } });

//     return res.json({ status: "ok" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "Invalid token" });
//   }
// };
module.exports = { registerUser, loginUser };

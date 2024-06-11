require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.models.js");

const registerUser = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      isAdmin: req.body.isAdmin,
      email: req.body.email,
      password: newPassword,
    });

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
      return { status: "error", error: "No such User Found!" };
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

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set to expire immediately
    });
    res.status(200).json({ status: "ok", message: "Logout Successful" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser };

const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "ProjectData" }],
  },
  {
    timestamps: true,
    collection: "user-data",
  }
);

const model = mongoose.model("UserData", User);

module.exports = model;

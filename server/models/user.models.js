const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: true, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
    collection: "user-data",
  }
);
const model = mongoose.model("User", UserSchema);

module.exports = model;

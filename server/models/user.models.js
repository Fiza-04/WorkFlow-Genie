const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    // tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
    collection: "user-data",
  }
);

// User.pre("save", async function (next) {
//   if (!this.isModified(password)) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// User.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const model = mongoose.model("UserData", User);

module.exports = model;

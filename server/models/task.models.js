const mongoose = require("mongoose");
const { Schema } = mongoose;

const Task = new mongoose.Schema(
  {
    taskTitle: { type: String, required: true },
    taskDoc: { type: Date, default: new Date() },
    taskEod: { type: Date, required: true },
    taskDesc: { type: String },
    taskPriority: {
      type: String,
      default: "normal",
      enum: ["low", "normal", "medium", "high"],
      required: true,
    },
    taskStage: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
      required: true,
    },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "UserData" }],
    assignedBy: [{ type: Schema.Types.ObjectId, ref: "UserData" }],
    taskIsTrashed: { type: Boolean, required: true },
    taskCreatedBy: [{ type: Schema.Types.ObjectId, ref: "UserData" }],
  },
  {
    timestamps: true,
    collection: "task-data",
  }
);

const model = mongoose.model("TaskData", Task);

module.exports = model;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    taskTitle: { type: String, required: true },
    taskDoc: { type: Date, default: Date.now },
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
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    assignedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    taskIsTrashed: { type: Boolean, default: false, required: true },
    taskCreatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    collection: "task-data",
  }
);

const model = mongoose.model("Task", TaskSchema);

module.exports = model;

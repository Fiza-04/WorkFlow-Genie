const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    eod: { type: Date, required: true },
    desc: { type: String, default: "" },
    priority: {
      type: String,
      default: "normal",
      enum: ["normal", "medium", "high"],
      required: true,
    },
    stage: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
      required: true,
    },
    team: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    isTrashed: { type: Boolean, default: false, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task", default: [] }],
  },
  {
    timestamps: true,
    collection: "project-data",
  }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

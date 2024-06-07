const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    eod: { type: Date, required: true },
    desc: { type: String, default: "" }, // Adding default empty string if not required
    priority: {
      type: String,
      default: "normal",
      enum: ["low", "normal", "medium", "high"],
      required: true,
    },
    stage: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
      required: true,
    },
    team: [{ type: Schema.Types.ObjectId, ref: "UserData", default: [] }],
    isTrashed: { type: Boolean, default: false, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserData", required: true }, // Assuming a single creator
    tasks: [{ type: Schema.Types.ObjectId, ref: "TaskData", default: [] }],
  },
  {
    timestamps: true,
    collection: "project-data",
  }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

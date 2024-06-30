const Task = require("../models/task.models.js");
const Project = require("../models/project.models.js");
const User = require("../models/user.models.js");
const mongoose = require("mongoose");

const newTask = async (req, res) => {
  const {
    taskTitle,
    taskEod,
    taskDesc,
    taskPriority,
    taskStage,
    assignedTo,
    assignedBy,
    taskIsTrashed,
    taskCreatedBy,
    project,
  } = req.body;

  try {
    const projectId = mongoose.Types.ObjectId.createFromHexString(project);

    const task = new Task({
      taskTitle,
      taskEod,
      taskDesc,
      taskPriority,
      taskStage,
      assignedTo,
      assignedBy,
      taskIsTrashed,
      taskCreatedBy,
      project: projectId,
    });

    const project_data = await Project.findById(projectId);
    if (!project_data) {
      return res.status(404).json({
        status: false,
        message: `Project not found for ID: ${projectId}`,
      });
    }
    await task.save();

    await User.updateMany(
      { _id: { $in: [taskCreatedBy, assignedTo, assignedBy] } },
      { $push: { tasks: task._id } }
    );

    project_data.tasks.push(task._id);
    await project_data.save();
    res
      .status(201)
      .json({ status: true, message: "Task created successfully." });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate({
        path: "assignedTo assignedBy taskCreatedBy",
        select: "username",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      status: true,
      tasks: task,
      message: "Task Received Successfully",
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        status: false,
        message: `Invalid project ID: ${projectId}`,
      });
    }

    const tasks = await Task.find({
      project: projectId,
      taskIsTrashed: false,
    })
      .sort({ taskEod: 1, taskPriority: 1 })
      .populate({
        path: "assignedTo assignedBy taskCreatedBy",
        select: "username email",
      });

    if (tasks.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No tasks found for this project",
      });
    }

    res.status(200).json({
      status: true,
      tasks: tasks,
      message: "Tasks received successfully",
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again later.",
    });
  }
};

const taskCount = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        status: false,
        message: `Invalid project ID: ${projectId}`,
      });
    }

    const pending = await Task.countDocuments({
      project: projectId,
      taskStage: "pending",
    });
    const progress = await Task.countDocuments({
      project: projectId,
      taskStage: "in-progress",
    });
    const completed = await Task.countDocuments({
      project: projectId,
      taskStage: "completed",
    });

    const all = pending + progress + completed;

    let taskCounts = {
      all: all,
      pending: pending,
      inProgress: progress,
      completed: completed,
    };

    res.json({
      status: true,
      count: taskCounts,
    });
  } catch (error) {
    console.error("Error fetching task counts:", error);
    res.status(500).json({ status: false, message: "No tasks found1" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(
      id,
      {
        taskTitle: req.body.taskTitle,
        taskEod: req.body.taskEod,
        taskDesc: req.body.taskDesc,
        taskPriority: req.body.taskPriority,
        taskStage: req.body.taskStage,
        assignedTo: req.body.assignedTo,
        assignedBy: req.body.assignedBy,
        taskIsTrashed: req.body.taskIsTrashed,
        taskCreatedBy: req.body.taskCreatedBy,
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }

    res.status(200).json({
      status: true,
      message: "Task updated Successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const trashTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    task.taskIsTrashed = true;

    await task.save();
    res.status(200).json({
      status: true,
      message: "Task trashed Successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteRestoreTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.query;
    let message = "";
    if (action === "delete") {
      await Task.findByIdAndDelete(id);
      message = "Task deleted successfully!";
    } else if (action === "deleteAll") {
      await Task.deleteMany(
        { taskIsTrashed: false },
        { $set: { taskIsTrashed: true } }
      );
      message = "All tasks deleted successfully!";
    } else if (action === "restore") {
      const resp = await Task.findById(id);
      resp.taskIsTrashed = false;
      resp.save();
      message = "Task restored successfully!";
    } else if (action === "restoreAll") {
      await Task.updateMany(
        { taskIsTrashed: true },
        { $set: { taskIsTrashed: false } }
      );
      message = "All task restored successfully!";
    }
    res.status(200).json({ status: true, message: message });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  newTask,
  // duplicateTask,
  // getAllTasks,
  getTask,
  getTasks,
  taskCount,
  updateTask,
  trashTask,
  deleteRestoreTask,
};

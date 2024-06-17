const Task = require("../models/task.models.js");
const Project = require("../models/project.models.js");
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

// const duplicateTask = async (req, res) => {
//   try {
//     console.log("here");
//     const { id } = req.params;
//     const task = await Task.findById(id);

//     console.log(task);

//     const newTaskData = {
//       ...task.toObject(),
//       _id: undefined,
//       taskTitle: `${task.taskTitle} - Copy`,
//       project: task.project._id,
//     };

//     const newTask = new Task(newTaskData);
//     await newTask.save();

//     const project = await Project.findById(task.project._id);
//     project.tasks.push(newTask._id);
//     await project.save();

//     res
//       .status(201)
//       .json({ status: true, message: "Task duplicated successfully." });
//   } catch (error) {
//     return res.status(400).json({ status: false, message: error.message });
//   }
// };

const getTasks = async (req, res) => {
  try {
    const {
      taskStage,
      taskPriority,
      taskIsTrashed,
      includeTasks,
      includeTeam,
    } = req.query;

    const projectId = req.params;

    let query = { taskIsTrashed: taskIsTrashed ? true : false };

    if (taskStage) {
      query.taskStage = taskStage;
    }

    if (taskPriority) {
      query.taskPriority = taskPriority;
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res
        .status(400)
        .json({ status: false, message: `Invalid project ID: ${projectId}` });
    }

    let queryResult = Task.find(query).sort({ _id: -1 });

    if (includeTeam === "true") {
      queryResult = queryResult.populate({
        path: "assignedTo assignedBy taskCreatedBy",
        select: "name email",
      });
    }

    if (includeTasks === "true") {
      queryResult = queryResult.populate({
        path: "project",
        match: { _id: mongoose.Types.ObjectId(projectId) },
        populate: {
          path: "tasks",
          select: "taskTitle taskEod taskPriority taskStage",
          populate: {
            path: "assignedTo assignedBy taskCreatedBy",
            select: "name email",
          },
        },
      });
    }
    const tasks = await queryResult;

    res.status(200).json({
      status: true,
      tasks: tasks,
      message: "Tasks Received Successfully",
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(400).json({ status: false, message: error.message });
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
  getTasks,
  updateTask,
  trashTask,
  deleteRestoreTask,
};

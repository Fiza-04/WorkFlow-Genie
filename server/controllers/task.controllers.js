const Task = require("../models/task.models.js");
const Project = require("../models/project.models.js");

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
    projectId,
  } = req.body;

  try {
    const project = await Project.findById(projectId);

    const task = await Task.create({
      taskTitle: taskTitle,
      taskEod: taskEod,
      taskDesc: taskDesc,
      taskPriority: taskPriority,
      taskStage: taskStage,
      assignedTo: assignedTo,
      assignedBy: assignedBy,
      taskIsTrashed: taskIsTrashed,
      taskCreatedBy: taskCreatedBy,
      project: projectId,
    });

    await task.save();
    project.tasks.push(task._id);
    await project.save();
    res
      .status(201)
      .json({ status: true, message: "Task created successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const duplicateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    console.log(task);

    const newTaskData = {
      ...task.toObject(),
      _id: undefined,
      taskTitle: `${task.taskTitle} - Copy`,
    };

    const newTask = new Task(newTaskData);
    await newTask.save();

    const project = await Project.findById(task.projectId);
    project.tasks.push(newTask._id);
    await project.save();

    res
      .status(201)
      .json({ status: true, message: "Task duplicated successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  newTask,
  duplicateTask,
  // getAllTasks,
  // getTask,
  // updateTask,
  // trashTask,
  // deleteRestoreTask,
};

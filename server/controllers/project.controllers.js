const Project = require("../models/project.models.js");
const User = require("../models/user.models.js");
const Task = require("../models/task.models.js");

const newProject = async (req, res) => {
  const { title, eod, desc, priority, stage, team, createdBy } = req.body;
  try {
    const newProject = await Project.create({
      title: title,
      eod: eod,
      desc: desc,
      priority: priority,
      stage: stage,
      team: team,
      createdBy: createdBy,
    });

    await User.updateMany(
      { _id: { $in: team } },
      { $push: { projects: newProject._id } }
    );

    res
      .status(201)
      .json({ status: true, message: "Project created successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
      .populate({
        path: "team",
        select: "name",
      })
      .populate({
        path: "createdBy",
        select: "name,",
      })
      .sort({ _id: -1 });

    res.status(200).json({ status: true, project });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const { stage, isTrashed, priority } = req.query;
    const { userId } = req.params;

    let query = {
      isTrashed: isTrashed === "false",
      $or: [{ createdBy: userId }, { team: userId }],
    };

    if (stage) {
      query.stage = stage;
    }

    if (priority) {
      query.priority = priority;
    }

    let queryResult = Project.find(query).sort({ eod: 1, priority: 1 });

    queryResult = queryResult.populate({
      path: "createdBy team",
      select: "username email",
    });

    const projects = await queryResult;

    const pending = await Project.countDocuments({
      stage: "pending",
      isTrashed: false,
      $or: [{ createdBy: userId }, { team: userId }],
    });
    const progress = await Project.countDocuments({
      stage: "in-progress",
      isTrashed: false,
      $or: [{ createdBy: userId }, { team: userId }],
    });
    const completed = await Project.countDocuments({
      stage: "completed",
      isTrashed: false,
      $or: [{ createdBy: userId }, { team: userId }],
    });

    const all = pending + progress + completed;

    let projectCounts = {
      all: all,
      pending: pending,
      inProgress: progress,
      completed: completed,
    };

    res.status(200).json({ status: true, projects, count: projectCounts });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    data = {
      title: req.body.title,
      eod: req.body.eod,
      desc: req.body.desc,
      priority: req.body.priority,
      team: req.body.team,
      createdBy: req.body.createdBy,
      isTrashed: req.body.isTrashed,
    };

    const projectData = await Project.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        eod: req.body.eod,
        desc: req.body.desc,
        priority: req.body.priority,
        team: req.body.team,
        createdBy: req.body.createdBy,
        isTrashed: req.body.isTrashed,
        stage: req.body.stage,
      },
      { new: true, runValidators: true }
    );

    if (!projectData) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }

    res.status(200).json({
      status: true,
      message: "Project updated Successfully",
      projectData,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const trashProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }

    project.isTrashed = true;
    await project.save();

    await Task.updateMany({ project: id }, { $set: { taskIsTrashed: true } });

    res.status(200).json({
      status: true,
      message: "Project and its tasks trashed successfully",
      project,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteRestoreProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { action } = req.query;
    const project = Project.findById(id);
    if (project.createdBy.toString() !== userId.toString()) {
      let message = "";
      if (action === "delete") {
        await Project.findByIdAndDelete(id);
        message = "Project deleted successfully!";
      } else if (action === "deleteAll") {
        await Project.deleteMany(
          { isTrashed: false },
          { $set: { isTrashed: true } }
        );
        message = "All projects deleted successfully!";
      } else if (action === "restore") {
        const resp = await Project.findById(id);
        resp.isTrashed = false;
        resp.save();
        message = "Project restored successfully!";
      } else if (action === "restoreAll") {
        await Project.updateMany(
          { isTrashed: true },
          { $set: { isTrashed: false } }
        );
        message = "All projects restored successfully!";
      }
    } else {
      res.status(400).json({
        status: false,
        message: "You are not authorised to perform this action",
      });
    }

    res.status(200).json({ status: true, message: message });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  newProject,
  getProject,
  getAllProjects,
  updateProject,
  trashProject,
  deleteRestoreProject,
};

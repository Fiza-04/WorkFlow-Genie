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
    const { stage, isTrashed, priority, includeProjects, includeTeam } =
      req.query;

    // const userId = req.user._id;
    let query = { isTrashed: isTrashed ? true : false }; //, team: userId

    if (stage) {
      query.stage = stage;
    }

    if (priority) {
      query.priority = priority;
    }

    let queryResult = Project.find(query).sort({ _id: -1 });

    if (includeTeam === "true") {
      queryResult = queryResult.populate({
        path: "team",
        select: "name",
      });
    }

    if (includeProjects === "true") {
      queryResult = queryResult.populate({
        path: "Projects",
        populate: {
          path: "team",
          select: "name email",
        },
      });
    }

    const projects = await queryResult;

    res.status(200).json({ status: true, projects });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const project = await Project.findById(id);
    let data = {};

    if (project.createdBy.toString() !== userId.toString()) {
      data = {
        title: req.body.title,
        eod: req.body.eod,
        desc: req.body.desc,
        priority: req.body.priority,
        team: req.body.team,
        createdBy: req.body.createdBy,
        isTrashed: req.body.isTrashed,
      };
    } else {
      res.status(400).json({
        status: false,
        message: "You are not authorised to perform this action",
      });
    }

    const projectData = await Project.findByIdAndUpdate(
      id,
      ...data,
      { stage: req.body.stage },
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
    const userId = req.user._id;
    const project = await Project.findById(id);

    if (project.createdBy.toString() !== userId.toString()) {
      project.isTrashed = true;
    } else {
      res.status(400).json({
        status: false,
        message: "You are not authorised to perform this action",
      });
    }

    await project.save();
    res.status(200).json({
      status: true,
      message: "Project trashed Successfully",
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

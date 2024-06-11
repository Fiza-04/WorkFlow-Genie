const Project = require("../models/project.models.js");

const newProject = async (req, res) => {
  const { title, eod, desc, priority, stage, team, createdBy } = req.body;

  try {
    await Project.create({
      title: title,
      eod: eod,
      desc: desc,
      priority: priority,
      stage: stage,
      team: team,
      createdBy: createdBy,
    });
    res
      .status(201)
      .json({ status: true, message: "Project created successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const duplicateProject = async (req, res) => {
  try {
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

    let query = { isTrashed: isTrashed ? true : false };

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

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        eod: req.body.eod,
        desc: req.body.desc,
        priority: req.body.priority,
        stage: req.body.stage,
        team: req.body.team,
        createdBy: req.body.createdBy,
        isTrashed: req.body.isTrashed,
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }

    res.status(200).json({
      status: true,
      message: "Project updated Successfully",
      project,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const trashProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    project.isTrashed = true;

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

// check working
const deleteRestoreProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.query;

    if (action === "delete") {
      await Project.findByIdAndDelete(id);
    } else if (action === "deleteAll") {
      await Project.deleteMany({ isTrashed: true });
    } else if (action === "restore") {
      const resp = await Project.findById(id);
      resp.isTrashed = false;
      resp.save();
    } else if (action === "restoreAll") {
      await Project.updateMany(
        { isTrashed: true },
        { $set: { isTrashed: false } }
      );
    }
    res
      .status(200)
      .json({ status: true, message: "Project created successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  newProject,
  duplicateProject,
  getProject,
  getAllProjects,
  updateProject,
  trashProject,
  deleteRestoreProject,
};

const Project = require("../models/project.models.js");

const newProject = async (req, res) => {
  const { title, eod, desc, priority, stage, team, createdBy } = req.body;

  if (!title || !eod || !createdBy) {
    return res.status(400).json({
      status: false,
      message: "Title, eod, and createdBy are required fields.",
    });
  }

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

const getProject = async (req, res) => {};

const getAllProjects = async (req, res) => {
  try {
    const { stage, isTrashed, priority } = req.query;
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const updateProject = async (req, res) => {};

const deleteProject = async (req, res) => {};

module.exports = {
  newProject,
  getProject,
  getAllProjects,
  updateProject,
  deleteProject,
};

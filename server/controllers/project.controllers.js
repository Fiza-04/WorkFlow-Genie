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

const getProject = async (req, res) => {};

const getAllProjects = async (req, res) => {
  try {
    const { stage, isTrashed, priority, includeTasks, includeTeam } = req.query;

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
        select: "name title email",
      });
    }

    if (includeTasks === "true") {
      queryResult = queryResult.populate({
        path: "tasks",
        populate: {
          path: "team",
          select: "name title email",
        },
      });
    }

    const projects = await queryResult;

    res.status(200).json({ status: true, projects });
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

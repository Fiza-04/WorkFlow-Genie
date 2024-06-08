const express = require("express");
const {
  newProject,
  getAllProjects,
} = require("../controllers/project.controllers.js");

const router = express.Router();

router.post("/new-project", newProject);

router.get("/all-projects", getAllProjects);

module.exports = router;

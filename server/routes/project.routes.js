const express = require("express");
const { newProject } = require("../controllers/project.controllers.js");

const router = express.Router();

router.post("/new-project", newProject);

module.exports = router;

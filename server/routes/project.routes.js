const express = require("express");
const {
  newProject,
  duplicateProject,
  getAllProjects,
  getProject,
  updateProject,
  trashProject,
  deleteRestoreProject,
} = require("../controllers/project.controllers.js");

const router = express.Router();

router.post("/new-project", newProject);
router.post("/duplicate/:id", duplicateProject);

router.get("/", getAllProjects);
router.get("/:id", getProject);

router.put("/update/:id", updateProject);
router.put("/:id", trashProject);

router.delete("/delete-restore/:id?", deleteRestoreProject);

module.exports = router;

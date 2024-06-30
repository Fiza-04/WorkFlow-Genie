const express = require("express");
const {
  newProject,
  getAllProjects,
  getProject,
  updateProject,
  trashProject,
  getAllTrashedProjects,
  deleteRestoreProject,
} = require("../controllers/project.controllers.js");

const router = express.Router();

router.post("/new-project", newProject);

router.get("/all/:userId", getAllProjects);
router.get("/:id", getProject);
router.get("/trashed/:userId", getAllTrashedProjects);

router.put("/update/:id", updateProject);
router.put("/trash/:id", trashProject);

router.delete("/delete-restore/:id?", deleteRestoreProject);

module.exports = router;

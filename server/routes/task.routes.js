const express = require("express");
const {
  newTask,
  // duplicateTask,
  // getAllTasks,
  getTask,
  getTasks,
  taskCount,
  updateTask,
  trashTask,
  deleteRestoreTask,
} = require("../controllers/task.controllers.js");

const router = express.Router();

router.post("/new-task", newTask);
// router.post("/duplicate/:id", duplicateTask);

// router.get("/", getAllTasks);
router.get("/:id", getTask);
router.get("/project/:projectId", getTasks);
router.get("/count/:projectId", taskCount);

router.put("/update/:id", updateTask);
router.put("/trash/:id", trashTask);

module.exports = router;

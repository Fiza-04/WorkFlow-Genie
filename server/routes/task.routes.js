const express = require("express");
const {
  newTask,
  // duplicateTask,
  // getAllTasks,
  getTasks,
  updateTask,
  trashTask,
  deleteRestoreTask,
} = require("../controllers/task.controllers.js");

const router = express.Router();

router.post("/new-task", newTask);
// router.post("/duplicate/:id", duplicateTask);

// router.get("/", getAllTasks);
router.get("/:id", getTasks);

router.put("/update/:id", updateTask);
router.put("/:id", trashTask);

router.delete("/delete-restore/:id?", deleteRestoreTask);

module.exports = router;

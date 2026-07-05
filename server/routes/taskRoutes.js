const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  addComment,
} = require("../controllers/taskController");

const router = express.Router();

router.use(protect);

// Create Task
router.post(
  "/",
  authorizeRoles("Admin", "ProjectManager"),
  createTask
);

// Get All Tasks
router.get("/", getTasks);

// Get Tasks by Project
router.get("/project/:projectId", getTasksByProject);

// Get Single Task
router.get("/:id", getTaskById);

// Update Task
router.put(
  "/:id",
  authorizeRoles(
    "Admin",
    "ProjectManager",
    "Developer"
  ),
  updateTask
);

// Add Comment
router.post(
  "/:id/comment",
  authorizeRoles(
    "Admin",
    "ProjectManager",
    "Developer"
  ),
  addComment
);

// Delete Task
router.delete(
  "/:id",
  authorizeRoles("Admin"),
  deleteTask
);

module.exports = router;
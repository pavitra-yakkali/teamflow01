const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getTeamMembers,
  addMember,
  removeMember,
} = require("../controllers/teamController");

router.use(protect);

// Get Team Members
router.get(
  "/:projectId",
  authorizeRoles("Admin", "ProjectManager"),
  getTeamMembers
);

// Add Member
router.post(
  "/:projectId",
  authorizeRoles("Admin", "ProjectManager"),
  addMember
);

// Remove Member
router.delete(
  "/:projectId/:memberId",
  authorizeRoles("Admin", "ProjectManager"),
  removeMember
);

module.exports = router;
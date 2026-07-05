const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getActivities,
  createActivity,
  getRecentActivities,
} = require("../controllers/activityController");

// ================= GET ALL ACTIVITIES =================
router.get(
  "/",
  protect,
  authorizeRoles(
    "Admin",
    "ProjectManager"
  ),
  getActivities
);

// ================= RECENT ACTIVITIES =================
router.get(
  "/recent",
  protect,
  getRecentActivities
);

// ================= CREATE ACTIVITY =================
router.post(
  "/",
  protect,
  createActivity
);

module.exports = router;
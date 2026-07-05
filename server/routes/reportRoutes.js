const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getDashboardReport,
  exportCSV,
} = require("../controllers/reportController");

// ================= DASHBOARD REPORT =================
router.get(
  "/dashboard",
  protect,
  authorizeRoles(
    "Admin",
    "ProjectManager",
    "Reviewer"
  ),
  getDashboardReport
);

// ================= EXPORT REPORT =================
router.get(
  "/export",
  protect,
  authorizeRoles(
    "Admin",
    "ProjectManager"
  ),
  exportCSV
);

module.exports = router;
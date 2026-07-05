const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createRCA,
  getRCAs,
  getRCAById,
  updateRCA,
  deleteRCA,
} = require("../controllers/rcaController");

// ================= CREATE RCA =================
router.post(
  "/",
  protect,
  authorizeRoles("Admin", "Reviewer"),
  createRCA
);

// ================= GET ALL RCAs =================
router.get(
  "/",
  protect,
  authorizeRoles(
    "Admin",
    "ProjectManager",
    "Reviewer"
  ),
  getRCAs
);

// ================= GET SINGLE RCA =================
router.get(
  "/:id",
  protect,
  authorizeRoles(
    "Admin",
    "ProjectManager",
    "Reviewer"
  ),
  getRCAById
);

// ================= UPDATE RCA =================
router.put(
  "/:id",
  protect,
  authorizeRoles(
    "Admin",
    "Reviewer"
  ),
  updateRCA
);

// ================= DELETE RCA =================
router.delete(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  deleteRCA
);

module.exports = router;
const express = require("express");

const router = express.Router();

const upload = require("../middleware/chatUpload");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  sendMessage,
  getConversation,
  markSeen,
} = require("../controllers/messageController");

// Protect all message routes
router.use(protect);

// Allow all valid TeamFlow roles to use chat
router.use(
  authorizeRoles(
    "Admin",
    "ProjectManager",
    "Developer",
    "Reviewer"
  )
);

// ================= SEND MESSAGE =================
router.post(
  "/",
  upload.single("attachment"),
  sendMessage
);

// ================= GET CONVERSATION =================
router.get(
  "/:userId",
  getConversation
);

// ================= MARK MESSAGES AS SEEN =================
router.put(
  "/seen/:userId",
  markSeen
);

module.exports = router;
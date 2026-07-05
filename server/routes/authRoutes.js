console.log("🔥 AUTH ROUTES FILE LOADED");

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// ================= REGISTER =================
router.post("/register", registerUser);

// ================= LOGIN =================
router.post("/login", loginUser);

// ================= GET ALL USERS =================
router.get("/users", protect, getAllUsers);

// ================= TEST ROUTE =================
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth route is working ✅",
  });
});

module.exports = router;
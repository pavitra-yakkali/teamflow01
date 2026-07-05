const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createNotification = require("../utils/createNotification");
const sendEmail = require("../services/emailService");
const logActivity = require("../utils/logActivity");

// ================= GENERATE JWT TOKEN =================
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  console.log("========== REGISTER API HIT ==========");
  console.log("Request Body:", req.body);

  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    const token = generateToken(user._id);

    // Welcome Notification
    await createNotification({
      title: "Welcome to TeamFlow",
      message: "Your account has been created successfully.",
      user: user._id,
      type: "System",
    });

    // Welcome Email
    await sendEmail(
      user.email,
      "Welcome to TeamFlow",
      `
      <h2>Welcome to TeamFlow 🚀</h2>

      <p>Hello <b>${user.name}</b>,</p>

      <p>Your TeamFlow account has been created successfully.</p>

      <p>You can now log in and start managing your projects and tasks.</p>

      <br/>

      <p>Thank you for choosing TeamFlow!</p>
      `
    );

    // Activity Log
    await logActivity(
      user._id,
      "Registered",
      "Authentication",
      `${user.name} registered a new account`
    );

    console.log("✅ User Registered:", user.email);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  console.log("========== LOGIN API HIT ==========");
  console.log("Request Body:", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    // Activity Log
    await logActivity(
      user._id,
      "Login",
      "Authentication",
      `${user.name} logged in`
    );

    console.log("✅ User Logged In:", user.email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL USERS =================
const getAllUsers = async (req, res) => {
  console.log("========== GET USERS API HIT ==========");

  try {
    const users = await User.find().select(
      "_id name email role avatar"
    );

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("❌ GET USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
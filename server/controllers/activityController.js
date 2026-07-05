const Activity = require("../models/Activity");

// Get All Activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ================= RECENT ACTIVITIES =================
const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Create Activity
const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create({
      user: req.user._id,
      action: req.body.action,
      module: req.body.module,
      description: req.body.description,
    });

    await activity.populate(
      "user",
      "name email"
    );

    res.status(201).json({
      success: true,
      activity,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getActivities,
  createActivity,
  getRecentActivities,
};
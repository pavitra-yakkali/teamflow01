const Project = require("../models/Project");
const Task = require("../models/Task");
const RCA = require("../models/RCA");

const getDashboardStats = async (req, res) => {
  try {
    const totalProjects =
      await Project.countDocuments();

    const totalTasks =
      await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "Done",
      });

    const pendingTasks =
      await Task.countDocuments({
        status: {
          $ne: "Done",
        },
      });

    const totalRCA =
      await RCA.countDocuments();

    const openRCA =
      await RCA.countDocuments({
        status: "Open",
      });

    const closedRCA =
      await RCA.countDocuments({
        status: "Closed",
      });

    const recentTasks =
      await Task.find()
        .sort({
          createdAt: -1,
        })
        .limit(8)
        .populate(
          "assignedTo",
          "name email"
        );

    res.json({
      success: true,

      stats: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        totalRCA,
        openRCA,
        closedRCA,
      },

      recentTasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
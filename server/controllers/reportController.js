console.log("✅ reportController loaded");
const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");
const RCA = require("../models/RCA");
const { Parser } = require("json2csv");

// Dashboard Summary
const exportCSV = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: {
        $ne: "Completed",
      },
    });

    const totalUsers = await User.countDocuments();

    const totalRCA = await RCA.countDocuments();

    const report = [
      {
        TotalProjects: totalProjects,
        TotalTasks: totalTasks,
        CompletedTasks: completedTasks,
        PendingTasks: pendingTasks,
        TotalUsers: totalUsers,
        TotalRCA: totalRCA,
      },
    ];

    const parser = new Parser();

    const csv = parser.parse(report);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("TeamFlow_Report.csv");

    res.send(csv);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
const getDashboardReport = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: {
        $ne: "Completed",
      },
    });

    const totalUsers = await User.countDocuments();

    const totalRCA = await RCA.countDocuments();

    res.json({
      success: true,
      report: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        totalUsers,
        totalRCA,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardReport,
  exportCSV,
};
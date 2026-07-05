const RCA = require("../models/RCA");
const logActivity = require("../utils/logActivity");

// ================= CREATE RCA =================
const createRCA = async (req, res) => {
  try {
    const rca = await RCA.create({
      ...req.body,
      createdBy: req.user._id,
    });

    await rca.populate("project", "title");
    await rca.populate("task", "title");
    await rca.populate("createdBy", "name email");

    // Activity Log
    await logActivity(
      req.user._id,
      "Created",
      "RCA",
      `Created RCA "${rca.title}"`
    );

    res.status(201).json({
      success: true,
      message: "RCA Created Successfully",
      rca,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET ALL RCAs =================

// ================= GET ALL RCAs =================
const getRCAs = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    if (search) {
      filter = {
        title: {
          $regex: search,
          $options: "i",
        },
      };
    }

    const rcas = await RCA.find(filter)
      .populate("project", "title")
      .populate("task", "title")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rcas.length,
      rcas,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET RCA BY ID =================
const getRCAById = async (req, res) => {
  try {
    const rca = await RCA.findById(req.params.id)
      .populate("project")
      .populate("task")
      .populate("createdBy");

    if (!rca) {
      return res.status(404).json({
        success: false,
        message: "RCA not found",
      });
    }

    res.json({
      success: true,
      rca,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE RCA =================
const updateRCA = async (req, res) => {
  try {
    const rca = await RCA.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!rca) {
      return res.status(404).json({
        success: false,
        message: "RCA not found",
      });
    }

    // Activity Log
    await logActivity(
      req.user._id,
      "Updated",
      "RCA",
      `Updated RCA "${rca.title}"`
    );

    res.json({
      success: true,
      message: "RCA Updated Successfully",
      rca,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE RCA =================
const deleteRCA = async (req, res) => {
  try {
    const rca = await RCA.findById(req.params.id);

    if (!rca) {
      return res.status(404).json({
        success: false,
        message: "RCA not found",
      });
    }

    // Activity Log
    await logActivity(
      req.user._id,
      "Deleted",
      "RCA",
      `Deleted RCA "${rca.title}"`
    );

    await RCA.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "RCA Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createRCA,
  getRCAs,
  getRCAById,
  updateRCA,
  deleteRCA,
};
const Project = require("../models/Project");
const logActivity = require("../utils/logActivity");

// Create Project
const createProject = async (req, res) => {
  try {
    const { title, description, status, members, startDate, endDate } = req.body;

    const project = await Project.create({
      title,
      description,
      status,
      members,
      startDate,
      endDate,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
    await logActivity(
  req.user._id,
  "Created",
  "Project",
  `Created project "${project.title}"`
);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Projects (owned by or member of logged-in user)
// ================= GET ALL PROJECTS =================
const getProjects = async (req, res) => {
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

    const projects = await Project.find(filter)
      .populate("owner", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Get Single Project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email role");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET PROJECT BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const { title, description, status, members, startDate, endDate } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, status, members, startDate, endDate },
      { new: true, runValidators: true }
    )
      .populate("owner", "name email")
      .populate("members", "name email role");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
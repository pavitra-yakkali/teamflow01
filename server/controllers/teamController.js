const Project = require("../models/Project");

// ================= GET TEAM MEMBERS =================
const getTeamMembers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("members", "name email role");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      members: project.members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= ADD MEMBER =================
const addMember = async (req, res) => {
  try {
    const { memberId } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.members.includes(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Member already exists",
      });
    }

    project.members.push(memberId);

    await project.save();

    res.status(200).json({
      success: true,
      message: "Member added successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= REMOVE MEMBER =================
const removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.members = project.members.filter(
      (member) =>
        member.toString() !== req.params.memberId
    );

    await project.save();

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getTeamMembers,
  addMember,
  removeMember,
};
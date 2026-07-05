const Task = require("../models/Task");
const Project = require("../models/Project");
const createNotification = require("../utils/createNotification");
const sendEmail = require("../services/emailService");
const logActivity = require("../utils/logActivity");

// ================= CREATE TASK =================
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate,
      attachment,
    } = req.body;

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      assignedBy: req.user._id,
      priority,
      dueDate,
      attachment,
    });

    await logActivity(
      req.user._id,
      "Created",
      "Task",
      `Created task "${task.title}"`
    );

    await task.populate("project", "title");
    await task.populate("assignedTo", "name email role");
    await task.populate("assignedBy", "name email role");

    if (task.assignedTo) {
      await createNotification({
        title: "New Task Assigned",
        message: `Task "${task.title}" has been assigned to you.`,
        user: task.assignedTo._id,
        type: "Task",
      });

      if (task.assignedTo.email) {
        await sendEmail(
          task.assignedTo.email,
          "New Task Assigned",
          `
          <h2>TeamFlow</h2>

          <p>Hello ${task.assignedTo.name},</p>

          <p>You have been assigned a new task.</p>

          <h3>${task.title}</h3>

          <p>${task.description}</p>
          `
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL TASKS =================
const getTasks = async (req, res) => {
  try {
    const { search, status, priority } = req.query;

    let filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter)
      .populate("project", "title")
      .populate("assignedTo", "name email role")
      .populate("assignedBy", "name email role")
      .populate("comments.user", "name");

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET TASKS BY PROJECT =================
const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("project", "title")
      .populate("assignedTo", "name email role")
      .populate("assignedBy", "name email role")
      .populate("comments.user", "name");

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("GET PROJECT TASKS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE TASK =================
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "title")
      .populate("assignedTo", "name email role")
      .populate("assignedBy", "name email role")
      .populate("comments.user", "name");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("GET TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE TASK =================
const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      status,
      priority,
      dueDate,
      attachment,
    } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        assignedTo,
        status,
        priority,
        dueDate,
        attachment,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("project", "title")
      .populate("assignedTo", "name email role")
      .populate("assignedBy", "name email role")
      .populate("comments.user", "name");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await logActivity(
      req.user._id,
      "Updated",
      "Task",
      `Updated task "${task.title}"`
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADD COMMENT =================
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.comments.push({
      user: req.user._id,
      text,
    });

    await task.save();

    await task.populate("comments.user", "name");

    if (task.assignedTo) {
      await createNotification({
        title: "New Comment",
        message: `Someone commented on "${task.title}".`,
        user: task.assignedTo,
        type: "Comment",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comments: task.comments,
    });
  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE TASK =================
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await logActivity(
      req.user._id,
      "Deleted",
      "Task",
      `Deleted task "${task.title}"`
    );

    if (task.assignedTo) {
      await createNotification({
        title: "Task Deleted",
        message: `Task "${task.title}" has been deleted.`,
        user: task.assignedTo,
        type: "Task",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTasksByProject,
  getTaskById,
  updateTask,
  addComment,
  deleteTask,
};
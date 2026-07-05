const Activity = require("../models/Activity");

const logActivity = async (
  user,
  action,
  module,
  description
) => {
  try {
    await Activity.create({
      user,
      action,
      module,
      description,
    });
  } catch (err) {
    console.log("Activity Log Error:", err.message);
  }
};

module.exports = logActivity;
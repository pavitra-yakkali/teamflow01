const Notification = require("../models/Notification");

const createNotification = async ({
  title,
  message,
  user,
  type = "System",
}) => {
  try {
    await Notification.create({
      title,
      message,
      user,
      type,
    });
  } catch (err) {
    console.log("Notification Error:", err.message);
  }
};

module.exports = createNotification;
const cron = require("node-cron");

const Task = require("../models/Task");

const createNotification =
require("../utils/createNotification");

cron.schedule("0 9 * * *", async () => {

  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const tasks = await Task.find({
    dueDate: {
      $lte: tomorrow,
    },
  });

  for (const task of tasks) {

    await createNotification({

      title: "Deadline Reminder",

      message: `${task.title} is due tomorrow.`,

      user: task.assignedTo,

      type: "Task",

    });

  }

});
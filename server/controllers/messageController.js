const Message = require("../models/Message");

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const attachment = req.file
  ? {
      filename: req.file.filename,
      path: "/uploads/chat/" + req.file.filename,
      mimetype: req.file.mimetype,
    }
  : null;

const message = await Message.create({
  sender: req.user._id,
  receiver: req.body.receiver,
  project: req.body.project,
  message: req.body.message,
  attachment,
});

    await message.populate(
      "sender receiver",
      "name email avatar"
    );

    res.status(201).json({
      success: true,
      message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Conversation
exports.getConversation = async (
  req,
  res
) => {
  try {
    const messages = await Message.find({
      $or: [
        {
          sender: req.user._id,
          receiver: req.params.userId,
        },
        {
          sender: req.params.userId,
          receiver: req.user._id,
        },
      ],
    })
      .populate(
        "sender receiver",
        "name avatar"
      )
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Mark Seen
exports.markSeen = async (
  req,
  res
) => {
  try {
    await Message.updateMany(
      {
        sender: req.params.userId,
        receiver: req.user._id,
      },
      {
        isSeen: true,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
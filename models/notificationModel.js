const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please input your notification title"],
  },
  description: {
    type: String,
    required: [true, "please input your description"],
  },
  courseCode: {
    type: String,
    required: [true, "please input your code"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

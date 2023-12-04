const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");

exports.postNotifications = catchAsync(async (req, res) => {
  const newNotification = await Notification.create({
    title: req.body.title,
    description: req.body.description,
    courseCode: req.body.courseCode,
  });

  res.status(200).json({
    status: "success",
    data: newNotification,
  });
});

exports.getNotifications = catchAsync(async (req, res) => {
  const { courseCode } = req.params;

  const notifications = await Notification.find();

  res.status(200).json({
    status: "success",
    results: notifications.length,
    data: {
      data: notifications,
    },
  });
});

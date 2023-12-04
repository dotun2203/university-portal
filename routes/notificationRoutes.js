const express = require("express");
const authLecturerController = require("../controllers/authLecturerController");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.post(
  "/notification",
  authLecturerController.protectRoutes,
  authLecturerController.restrictTo("lecturer"),
  notificationController.postNotifications
);

router.get(
  "/notification",
  authLecturerController.protectRoutes,
  notificationController.getNotifications
);

module.exports = router;

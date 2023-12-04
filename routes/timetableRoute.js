const express = require("express");
const authLecturerController = require("../controllers/authLecturerController");
const timetableController = require("../controllers/timetableController");

const router = express.Router();

router.post(
  "/timetable",
  authLecturerController.protectRoutes,
  authLecturerController.restrictTo("lecturer", "admin"),
  timetableController.postTimetable
);

router.get(
  "/timetable",
  authLecturerController.protectRoutes,
  timetableController.getTimetable
);

router.patch(
  "/timetable/:id",
  authLecturerController.protectRoutes,
  authLecturerController.restrictTo("admin"),
  timetableController.updateTimetable
);

router.delete(
  "/timetable/:id",
  authLecturerController.protectRoutes,
  authLecturerController.restrictTo("admin"),
  timetableController.deleteTimetable
);

module.exports = router;

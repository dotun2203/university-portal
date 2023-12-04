const express = require("express");
const authLecturerController = require("../controllers/authLecturerController");
const announcementController = require("../controllers/announcementController");

const router = express.Router();

router
  .route("/announcements")
  .post(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin"),
    announcementController.postAnnouncement
  )
  .get(
    authLecturerController.protectRoutes,
    announcementController.getAnnouncement
  );

router
  .route("/announcements/:id")
  .patch(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin"),
    announcementController.updateAnnouncement
  )
  .delete(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin"),
    announcementController.deleteAnnouncement
  );

module.exports = router;
("");

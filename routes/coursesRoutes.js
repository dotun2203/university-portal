const express = require("express");
const courseController = require("../controllers/courseController");
const authLecturerController = require("../controllers/authLecturerController");

const router = express.Router();

// router.post(
//   "/courses",
//   authController.protectRoutes,
//   authController.restrictTo("admin", "lecturer"),
//   courseController.postCourse
// );

router
  .route("/courses")
  .post(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin", "lecturer"),
    courseController.postCourse
  );

router
  .route("/courses/:id")
  .get(authLecturerController.protectRoutes, courseController.getSingleCourse)
  .patch(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin", "lecturer"),
    courseController.editCourse
  )
  .delete(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin"),
    courseController.deleteCourse
  );

router.post(
  "/courseMaterials",
  authLecturerController.protectRoutes,
  authLecturerController.restrictTo("lecturer"),
  courseController.postMaterials
);

module.exports = router;

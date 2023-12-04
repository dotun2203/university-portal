const express = require("express");
const userController = require("../controllers/userController");
const authLecturerController = require("../controllers/authLecturerController");

const router = express.Router();

router
  .route("/users")
  .post(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin"),
    userController.createUser
  )
  .get(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin"),
    userController.getAllUsers
  );

router
  .route("/users/:id")
  .patch(
    authLecturerController.protectRoutes,
    authLecturerController.restrictTo("admin"),
    userController.updateUser
  );

module.exports = router;

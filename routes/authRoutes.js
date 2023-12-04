const express = require("express");

const authLecturerController = require("../controllers/authLecturerController");

const authStudentController = require("../controllers/authStudentController");

const router = express.Router();

// router.post("/signup", authController.signup);
// router.post("/signin", authController.signin);
// router.patch(
//   "/updateMe",
//   authController.protectRoutes,
//   authController.updateMe
// );

router.post("/studentSignup", authStudentController.studentSignup);
router.post("/studentSignin", authStudentController.studentSignin);

router.patch(
  "/updateMe",
  authStudentController.protectRoutes,
  authStudentController.updateMe
);

router.post("/staffSignup", authLecturerController.staffSignup);
router.post("/staffSignin", authLecturerController.staffSignin);

router.patch(
  "/updateMe",
  authLecturerController.protectRoutes,
  authLecturerController.updateMe
);

module.exports = router;

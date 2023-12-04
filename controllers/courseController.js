const { default: next } = require("next");
const CourseMaterial = require("../models/courseModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");

exports.postCourse = catchAsync(async (req, res) => {
  const newCourse = await Course.create({
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
  });

  res.status(200).json({
    status: "success",
    data: newCourse,
  });
});

exports.editCourse = catchAsync(async (req, res) => {
  const editCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!editCourse) {
    return next(new AppError("no tour found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      editCourse,
    },
  });
});

exports.getSingleCourse = catchAsync(async (req, res) => {
  const newCourse = await Course.findById(req.params.id, req.body);

  if (!newCourse) {
    return next(new AppError("no course found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      newCourse,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res) => {
  const deleteCourse = await Course.findByIdAndDelete(req.params.id, req.body);

  if (!deleteCourse) {
    return next(new AppError("no course found with that id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const upload = multer({
  storage: multer.diskStorage({ destination: "./uploads/" }),
});

exports.postMaterials = catchAsync(async (req, res) => {
  const { courseCode, title, description, file } = req.body;

  // validate request body
  if (
    file.mimetype !== "application/pdf" &&
    file.mimetype !== "application/msword"
  ) {
    return res.status(400).json({
      message: " only PDF and WORD files are supported ",
    });
  }

  const newMaterial = await CourseMaterial.create({
    courseCode,
    title,
    description,
    file: req.file.path,
    fileType: req.file.mimetype,
  });

  res.status(201).json({
    message: "Course material uploaded successfully",
    data: newMaterial,
  });
});

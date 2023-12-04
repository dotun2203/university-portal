const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, "please input the course code"],
    trim: true,
  },

  courseName: {
    type: String,
    required: [true, "please provide the course name"],
    trim: true,
  },
});

const CourseMaterialsSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    trim: true,
    required: [true, "please input the course material code"],
  },
  title: {
    type: String,
    required: [true, "please input your course title"],
  },
  description: {
    type: String,
  },
  file: {
    type: String,
    required: [true, "please input the course file"],
  },
  fileType: {
    type: String,
    required: [true, "please input the file type"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CourseMaterial = mongoose.model("CourseMaterial", CourseMaterialsSchema);

module.exports = CourseMaterial;

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

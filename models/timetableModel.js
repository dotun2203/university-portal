const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, "please input your course code"],
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
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

const Timetable = mongoose.model("Timetable", TimetableSchema);

module.exports = Timetable;

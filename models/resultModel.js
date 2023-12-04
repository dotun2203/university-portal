const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, "please input the course code"],
    trim: true,
  },

  grade: {
    type: String,
    required: [true, "please input the unit and grade of the course"],
    trim: true,
  },
});

const Result = mongoose.model("Result", ResultSchema);
module.exports = Result;

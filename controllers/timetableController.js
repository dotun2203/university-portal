const Timetable = require("../models/timetableModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postTimetable = catchAsync(async (req, res) => {
  const newTimetable = await Timetable.create({
    courseCode: req.body.courseCode,
    dayOfWeek: req.body.dayOfWeek,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
  });

  res.status(200).json({
    status: "success",
    data: newTimetable,
  });
});

exports.getTimetable = catchAsync(async (req, res) => {
  const timetable = await Timetable.find();

  res.status(200).json({
    status: "success",
    results: timetable.length,
    data: {
      data: timetable,
    },
  });
});

exports.updateTimetable = catchAsync(async (req, res) => {
  const editTimetable = await Timetable.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!editTimetable) {
    return next(new AppError("no timetable found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      editTimetable,
    },
  });
});

exports.deleteTimetable = catchAsync(async (req, res) => {
  const deleteTimetable = await Timetable.findByIdAndDelete(
    req.params.id,
    req.body
  );

  if (!deleteTimetable) {
    return next(new AppError("no timetable with that id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

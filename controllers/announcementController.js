const Announcement = require("../models/announcementModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postAnnouncement = catchAsync(async (req, res) => {
  const newAnnouncement = await Announcement.create({
    heading: req.body.heading,
    details: req.body.details,
  });

  res.status(200).json({
    status: "success",
    data: newAnnouncement,
  });
});

exports.getAnnouncement = catchAsync(async (req, res) => {
  const announcement = await Announcement.find();

  res.status(200).json({
    status: "success",
    results: announcement.length,
    data: {
      data: announcement,
    },
  });
});

exports.updateAnnouncement = catchAsync(async (req, res) => {
  const editAnnouncement = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!editAnnouncement) {
    return next(new AppError("no announce ment with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      editAnnouncement,
    },
  });
});

exports.deleteAnnouncement = catchAsync(async (req, res) => {
  const deleteAnnouncement = await Announcement.findByIdAndDelete(
    req.params.id,
    req.body
  );

  if (!deleteAnnouncement) {
    return next(new AppError("there is no announcement with these id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

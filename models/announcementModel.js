const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "there must be a heading"],
    trim: true,
  },

  details: {
    type: String,
    required: [true, "each announcement must have details"],
    trim: true,
  },
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;

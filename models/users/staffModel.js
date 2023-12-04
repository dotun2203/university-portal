const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const StaffSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  registrationDate: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["lecturer", "admin"],
    default: "lecturer",
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    validate: [validator.isEmail, "please provide your email"],
  },

  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [8, "please your password must not be less than 8 characters"],
  },

  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: function (el) {
      return el === this.password;
    },
    message: "passwords are not the same",
  },

  lectureEmail: {
    type: String,
    unique: true,
  },
});

StaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

StaffSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const StaffUser = mongoose.model("StaffUser", StaffSchema);
module.exports = StaffUser;

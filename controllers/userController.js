const StudentUser = require("../models/users/studentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await StudentUser.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await StudentUser.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      data: users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await StudentUser.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("no user found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

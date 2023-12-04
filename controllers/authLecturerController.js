const catchAsync = require("../utils/catchAsync");
const StaffUser = require("../models/users/staffModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { promisify } = require("util");

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

exports.staffSignup = catchAsync(async (req, res) => {
  // const lecturerEmail = req.body.email;

  // const futaEmails = [];
  // for (const email of lecturerEmail) {
  //   const username = email.split("@")[0];

  //   const futaEmail = `${username}@futa.edu.ng`;
  //   futaEmails.push(futaEmail);
  // }

  const email = req.body.email;

  const emailSplit = email.split("@")[0];

  const lectureEmail = `${emailSplit}@futa.edu.ng`;

  const newStaff = await StaffUser.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    lectureEmail,
  });

  createSendToken(newStaff, 201, res);
});

exports.staffSignin = catchAsync(async (req, res, next) => {
  const { lectureEmail, password } = req.body;

  if (!lectureEmail || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  const user = await StaffUser.findOne({ lectureEmail }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await StaffUser.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("no user found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.protectRoutes = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you are not logged in! please log in to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError("the user belonging to the token does not exist", 401)
    );
  }

  // check if user changed password after token was issued

  // grant access to the protected route

  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

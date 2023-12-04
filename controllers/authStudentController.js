const catchAsync = require("../utils/catchAsync");
const StudentUser = require("../models/users/studentModel");
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

exports.studentSignup = catchAsync(async (req, res) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const lastTwoDigitsOfYear = currentYear % 100;

  function generateUniqueNumber() {
    let uniqueFourDigits = "";
    while (uniqueFourDigits.length < 4) {
      const digit = Math.floor(Math.random() * 10);
      if (!uniqueFourDigits.includes(digit)) {
        uniqueFourDigits += digit.toString();
      }
    }
    return uniqueFourDigits;
  }

  const fourNumbers = generateUniqueNumber();

  const matriculationNumber = `${req.body.course}/${lastTwoDigitsOfYear}/${fourNumbers}`;

  const newStudent = await StudentUser.create({
    fullName: req.body.fullName,
    email: req.body.email,
    course: req.body.course,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    registrationDate: req.body.registrationDate,
    matriculationNumber,
  });

  createSendToken(newStudent, 201, res);
});

exports.studentSignin = catchAsync(async (req, res, next) => {
  const { matriculationNumber, password } = req.body;

  if (!matriculationNumber || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  const user = await StudentUser.findOne({ matriculationNumber }).select(
    "+password"
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await StudentUser.findByIdAndUpdate(req.user._id, req.body, {
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

//  function generateUniqueNumber() {
//     let counter = 1000;

//     const existingNumbers = StudentUser.find({
//       matriculationNumber: counter,
//     });

//     if (existingNumbers.length > 0) {
//       counter++;
//     } else {
//       return counter;
//     }
//   }

//   function formatYearOfRegistration() {
//     const date = new Date();
//     const year = date.getFullYear();

//     const lastTwoDIgits = year % 100;

//     const formattedYear = lastTwoDIgits.toString();

//     return formattedYear;
//   }

//   const uniqueNumber = generateUniqueNumber();

//   function formatMatriculationNumber(uniqueNumber, courseCode) {
//     const yearOfRegistration = formatYearOfRegistration();
//     const uniqueNumberString = uniqueNumber.toString();

//     while (uniqueNumberString.length < 4) {
//       uniqueNumberString = "0" + uniqueNumberString;
//     }

//     const matriculationNumber = `${courseCode}/${yearOfRegistration}/${uniqueNumberString}`;

//     return matriculationNumber;
//   }

//   const matriculationNumber = formatMatriculationNumber(
//     uniqueNumber,
//     req.body.course
//   );

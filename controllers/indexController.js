const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require('../models/studentModel');
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/sendtoken");


// we can write the code without try catch using this middleware->. catchAsyncErrors
exports.HomePage = catchAsyncErrors(async (req, res, next) => {
    res.send('secure home page  only login user can access this page !');
})
exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id)
    res.json({student});
})

exports.studentSignUp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student(req.body).save();
    // set token
    sendtoken(student, 201, res)
})

exports.studentSignIn = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password")

    if (!student) {
        return next(new ErrorHandler("user not found with this email address"))
    }

    const isMatch = await student.comparePassword(req.body.password)
    if (!isMatch) {
        return next(new ErrorHandler("password is incorrect", 500))
    }
    sendtoken(student, 200, res)
})

exports.studentSignOut = catchAsyncErrors(async (req, res, next) => {
      res.clearCookie("token");
      res.json("successfully signed out")
})
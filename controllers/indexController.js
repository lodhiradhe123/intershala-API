const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require('../models/studentModel');
const ErrorHandler = require("../utils/ErrorHandler");


// we can write the code without try catch using this middleware->. catchAsyncErrors
exports.HomePage = catchAsyncErrors(async (req, res, next) => {
    res.send('Hello, World!');


})

exports.studentSignUp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student(req.body).save();
    res.send(student)

})

exports.studentSignIn = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password")

    if(!student){
        return next(new ErrorHandler("user not found with this email address"))
    }

    const isMatch = await student.comparePassword(req.body.password)
    if(!isMatch){
        return next(new ErrorHandler("password is incorrect",500))
    }
        
    res.json(student);

})

exports.studentSignOut = catchAsyncErrors(async (req, res, next) => {


})
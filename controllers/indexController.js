const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require('../models/studentModel');


// we can write the code without try catch using this middleware->. catchAsyncErrors
exports.HomePage = catchAsyncErrors(async (req, res, next) => {
        res.send('Hello, World!');
    

})

exports.studentSignUp = catchAsyncErrors(async (req, res, next) => {
        const student = await Student(req.body).save();
        res.send(student)

})
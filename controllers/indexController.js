const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
// we can write the code without try catch using this middleware.
exports.HomePage = catchAsyncErrors((req, res, next) => {
    res.send('Hello, World!');

})
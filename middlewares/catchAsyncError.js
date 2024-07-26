exports.catchAsyncErrors = (func) => (req, res, next) => {
    Promise.res(func(req, res, next)).catch(next)
};
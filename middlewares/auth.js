const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncErrors } = require("./catchAsyncError");

exports.isAuthenticated= catchAsyncErrors((req , res ,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new  ErrorHandler("plz login to access  resouces"), 401)
    } 
    const {id}= jwt.verify(token,process.env.JWT_SECRET)
    req.id= id;
    // res.json({id,token})
    next();
})
const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const studentModel = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        match: [/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i, "plz fill the valid email address"]

    },
    password: {
        type: String,
        select: false,
        required: [true, "password is required"],
        maxLength: [15, "password is too long"],
        minLength: [4, "password is too short"],
        // match: ["^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"]


    },

}, { timestamps: true });

// generate salt from password
studentModel.pre("save", function () {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

//  compare password creating function method

studentModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// jwt token creation function method
studentModel.methods.jwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}


module.exports = mongoose.model('Student', studentModel);
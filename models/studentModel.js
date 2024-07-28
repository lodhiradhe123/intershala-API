const mongoose = require('mongoose');

const studentModel = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        match: [/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i, "plz fill the valid email address"]

    },
    password: {
        type: String,
        required: [true, "password is required"],
        maxLength: [15, "password is too long"],
        minLength: [4, "password is too short"],
        // match: ["^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"]


    },

}, { timestamps: true });

module.exports = mongoose.model('Student', studentModel);
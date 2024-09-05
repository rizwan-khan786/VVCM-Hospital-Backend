const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true
    },
    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    MobileNo: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    CratedAt: {
        type: String
    },
    VisitedAt: {
        type: String
    }
});

const User = mongoose.model("User", userModel);
module.exports = User;
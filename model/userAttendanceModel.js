const mongoose = require('mongoose');

const userAttendanceSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: String,
        required: true
    },
    Attendance: [String]
});

const UserAttendance = mongoose.model('UserAttendance', userAttendanceSchema);
module.exports = UserAttendance;

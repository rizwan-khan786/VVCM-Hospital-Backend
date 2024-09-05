const express = require('express');
const router = express.Router();
const userAttendanceController = require('../controller/userAttendanceController'); 

// Add a new user attendance record
router.post('/add', userAttendanceController.addUserAttendance);

// Get user attendance by UserId
router.get('/get/:UserId', userAttendanceController.getUserAttendanceById);

// Get all user attendance records
router.get('/all', userAttendanceController.getAllUserAttendances);

// Update user attendance by UserId
router.put('/update/:UserId', userAttendanceController.updateUserAttendance);

// Delete user attendance by UserId
router.delete('/delete/:UserId', userAttendanceController.deleteUserAttendance);

module.exports = router;

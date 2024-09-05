const UserAttendance = require('../model/userAttendanceModel');

// Add a new user attendance record
exports.addUserAttendance = async (req, res) => {
    try {
        const { UserId, CreatedAt, Attendance } = req.body;
        const newUserAttendance = new UserAttendance({ UserId, CreatedAt, Attendance });
        await newUserAttendance.save();
        res.status(201).json({ message: 'User attendance created successfully', userAttendance: newUserAttendance });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user attendance', error: error.message });
    }
};

// Get user attendance by UserId
exports.getUserAttendanceById = async (req, res) => {
    try {
        const userAttendance = await UserAttendance.findOne({ UserId: req.params.UserId });
        if (!userAttendance) return res.status(404).json({ message: 'User attendance not found' });
        res.status(200).json(userAttendance);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user attendance', error: error.message });
    }
};

// Get all user attendance records
exports.getAllUserAttendances = async (req, res) => {
    try {
        const userAttendances = await UserAttendance.find();
        res.status(200).json(userAttendances);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user attendances', error: error.message });
    }
};

// Update user attendance by UserId
exports.updateUserAttendance = async (req, res) => {
    try {
        const userAttendance = await UserAttendance.findOneAndUpdate(
            { UserId: req.params.UserId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!userAttendance) return res.status(404).json({ message: 'User attendance not found' });
        res.status(200).json({ message: 'User attendance updated successfully', userAttendance });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user attendance', error: error.message });
    }
};

// Delete user attendance by UserId
exports.deleteUserAttendance = async (req, res) => {
    try {
        const userAttendance = await UserAttendance.findOneAndDelete({ UserId: req.params.UserId });
        if (!userAttendance) return res.status(404).json({ message: 'User attendance not found' });
        res.status(200).json({ message: 'User attendance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user attendance', error: error.message });
    }
};

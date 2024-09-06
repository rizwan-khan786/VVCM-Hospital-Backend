const moment = require('moment-timezone');
const User = require('../model/userModel');
const UserAttendance = require('../model/userAttendanceModel');
const Counter = require('../model/counterModel');

// Add a new user
exports.addUser = async (req, res) => {
    var id;
    var counter = await Counter.findOne({ Title: "Admin" });
    if (!counter) {
        counter = new Counter({ Title: "Admin", Count: 1 });
    } else {
        counter.Count += 1;
    }
    id = `Admin${counter.Count.toString().padStart(5, '0')}`;
    try {
        const { UserName, Email, MobileNo, Role, Password } = req.body;
        const newUser = new User({
            UserId: id,
            UserName,
            Email,
            MobileNo,
            Role,
            Password,
            CratedAt: moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss'),
            VisitedAt: "-"
        });
        const newUserAttendance = new UserAttendance({ UserId: id, CreatedAt: moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss'), Attendance: [] });
        await newUser.save();
        await newUserAttendance.save();
        await counter.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { UserId, Password } = req.body;

    if (!UserId || !Password) {
        return res.status(400).json({ message: 'UserId and Password are required' });
    }

    try {
        const user = await User.findOne({ UserId });

        if (!user) {
            return res.status(401).json({ message: 'Invalid UserId or Password' });
        }

        if (user.Password !== Password) {
            return res.status(401).json({ message: 'Invalid UserId or Password' });
        }

        const uservisit = await User.findOneAndUpdate(
            { UserId: UserId },
            { VisitedAt: moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss') },
            { new: true, runValidators: true }
        );

        const userAttendance = await UserAttendance.findOne({ UserId });

        if (!userAttendance) {
            return res.status(404).json({ message: 'User not found' });
        }

        userAttendance.Attendance.push(moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss'));

        await userAttendance.save();

        res.status(200).json({ message: 'Login successful', uservisit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get user by UserId
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ UserId: req.params.UserId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

// Update a user by UserId
exports.updateUser = async (req, res) => {
    const { UserId, UserName, Email, MobileNo, Role, Password, CratedAt, VisitedAt } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { UserId: req.params.UserId },
            { UserId, UserName, Email, MobileNo, Role, Password, CratedAt, VisitedAt },
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user by UserId
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ UserId: req.params.UserId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

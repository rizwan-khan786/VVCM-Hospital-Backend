const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); // Adjust path as needed

// Add a new user
router.post('/add', userController.addUser);

// Get all users
router.get('/login', userController.login);

// Get user by UserId
router.get('/get/:UserId', userController.getUserById);

// Get all users
router.get('/all', userController.getAllUsers);

// Update a user by UserId
router.put('/upadet/:UserId', userController.updateUser);

// Delete a user by UserId
router.delete('/delete/:UserId', userController.deleteUser);

module.exports = router;

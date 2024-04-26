const express = require('express');
const {
    createUser,
    getUserById,
    updateUserProfile,
    deleteUser
} = require('../controllers/userController.js');

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get user by ID
router.get('/:userId', getUserById);

// Update user profile
router.put('/:userId', updateUserProfile);

// Delete user
router.delete('/:userId', deleteUser);

module.exports = router;

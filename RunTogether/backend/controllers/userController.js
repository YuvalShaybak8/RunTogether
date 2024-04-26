const UserModel = require('../models/userModel.js');
const bcrypt = require('bcrypt'); // Import for password hashing

// Create a new user
async function createUser(req, res) {
    try {
        const { username, email, password, image } = req.body;

        // Hash the password before saving
        console.log('trying to create user')
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ username, email, password: hashedPassword, image });
        const savedUser = await newUser.save();
        console.log('saving user')
        res.status(201).json({ message: 'Signup successful!', user: savedUser });
    } catch (error) {
        console.error(error);
        let errorMessage = 'Error signing up';
        if (error.code === 11000) { // Handle duplicate email/username errors
            errorMessage = 'Username or email already exists';
        }
        res.status(500).json({ message: errorMessage });
    }
}

// Get user by ID
async function getUserById(req, res) {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update user profile
async function updateUserProfile(req, res) {
    try {
        const { userId } = req.params;
        const { username, email, image } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { username, email, image }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete user
async function deleteUser(req, res) {
    try {
        const { userId } = req.params;
        await UserModel.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getUserById,
    updateUserProfile,
    deleteUser
};

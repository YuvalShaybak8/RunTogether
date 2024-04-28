const UserModel = require('../models/userModel.js');
const bcrypt = require('bcrypt'); // Import for password hashing
const avatarImg = '../assets/avatar.jpg';
const jwt = require('jsonwebtoken');
const { generateToken } = require('../auth/tokenUtils.js');

// Create a new user
async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        image = avatarImg;
        const newUser = new UserModel({ username, email, password: hashedPassword, image });
        const savedUser = await newUser.save();
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

// Get user by Email
async function getUserByEmail(req, res) {
    try {
        const { email } = req.params;
        console.log('email', email)
        const user = await UserModel.findById(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        console.log(email + '   ' + password)

        const user = await UserModel.findOne({ email }); // Find user by email

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        console.log('token', token)
        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Error logging in' });
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
    getUserByEmail,
    updateUserProfile,
    deleteUser,
    login
};

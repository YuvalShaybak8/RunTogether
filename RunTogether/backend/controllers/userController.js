import UserModel from '../models/userModel.js';

// Create a new user
export async function createUser(req, res) {
    try {
        const { username, email, password, image } = req.body;
        // const newUser = new UserModel({
        //     username,
        //     email,
        //     password,
        //     image
        // });
        // console.log(newUser)
        // const savedUser = await newUser.save();
        const newUser = await UserModel.create({ username, email, password, image })
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get user by ID
export async function getUserById(req, res) {
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
export async function updateUserProfile(req, res) {
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
export async function deleteUser(req, res) {
    try {
        const { userId } = req.params;
        await UserModel.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    createUser,
    getUserById,
    updateUserProfile,
    deleteUser
};

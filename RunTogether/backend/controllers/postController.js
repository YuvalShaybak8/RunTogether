const postModel = require('../models/postModel.js');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

async function createPost(req, res) {
    try {
        const { image, description, location } = req.body;

        // Extract user ID from the token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret key
        const userId = decodedToken.user.id;

        // Create new post with user ID
        const newPost = new postModel({
            user: userId, // Include user ID in the post data
            image,
            description,
            location,
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({ message: error.message });
    }
}


async function getAllPosts(req, res) {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPostsByUser(req, res) {
    try {
        const posts = await postModel.find({ user: req.params.userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { image, description, location } = req.body;
        const updatedPost = await postModel.findByIdAndUpdate(id, { image, description, location }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deletePost(req, res) {
    try {
        const { id } = req.params;
        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostsByUser,
    updatePost,
    deletePost
};

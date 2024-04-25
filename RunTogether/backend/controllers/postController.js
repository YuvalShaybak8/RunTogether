import postModel from '../models/postModel.js';

export async function createPost(req, res) {
    try {
        const { image, description, location } = req.body;
        const newPost = new postModel({
            image,
            description,
            location,
            user: req.user.id // Assuming you're using JWT for authentication and storing user ID in req.user
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all posts
export async function getAllPosts(req, res) {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get posts by user
export async function getPostsByUser(req, res) {
    try {
        const posts = await postModel.find({ user: req.params.userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a post
export async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { image, description, location } = req.body;
        const updatedPost = await postModel.findByIdAndUpdate(id, { image, description, location }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a post
export async function deletePost(req, res) {
    try {
        const { id } = req.params;
        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    createPost,
    getAllPosts,
    getPostsByUser,
    updatePost,
    deletePost
};

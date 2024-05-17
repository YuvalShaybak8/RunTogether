const postModel = require("../models/postModel.js");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken library

async function createPost(req, res) {
  try {
    const { image, description, location } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user.id;

    const newPost = new postModel({
      user: userId,
      image,
      description: description || "",
      location,
      likes: [],
      comments: [],
    });
    console.log("newPost", newPost);
    const savedPost = await newPost.save();
    console.log("savedPost", savedPost);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
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

async function getPostById(req, res) {
  try {
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { description, image } = req.body;
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { description, image },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function likePost(req, res) {
  try {
    const { postId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user.id;

    const post = await postModel.findById(postId);

    // Check if the user has already liked the post
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Remove the user's like from the post
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    } else {
      // Add the user's like to the post
      post.likes.push(userId);
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    res.status(500).json({ message: error.message });
  }
}

async function commentOnPost(req, res) {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user.id;

    const post = await postModel.findById(postId);

    const newComment = {
      user: userId,
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    post.comments.push(newComment);

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error commenting on post:", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
  getPostById,
};

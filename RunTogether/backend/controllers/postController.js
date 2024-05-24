const postModel = require("../models/postModel.js");
const jwt = require("jsonwebtoken");
const { redis } = require("../utils/redisClient");

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
    const savedPost = await newPost.save();

    redis.del("posts");

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllPosts(req, res) {
  try {
    redis.get("posts", async (err, data) => {
      if (err) throw err;

      if (data) {
        return res.status(200).json(JSON.parse(data));
      } else {
        const posts = await postModel.find();
        redis.setex("posts", 3600, JSON.stringify(posts));
        res.status(200).json(posts);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPostsByUser(req, res) {
  try {
    const cacheKey = `posts:user:${req.params.userId}`;
    redis.get(cacheKey, async (err, data) => {
      if (err) throw err;

      if (data) {
        return res.status(200).json(JSON.parse(data));
      } else {
        const posts = await postModel.find({ user: req.params.userId });
        redis.setex(cacheKey, 3600, JSON.stringify(posts));
        res.status(200).json(posts);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPostById(req, res) {
  try {
    const cacheKey = `post:${req.params.postId}`;
    redis.get(cacheKey, async (err, data) => {
      if (err) throw err;

      if (data) {
        return res.status(200).json(JSON.parse(data));
      } else {
        const post = await postModel.findById(req.params.postId);
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
        redis.setex(cacheKey, 3600, JSON.stringify(post));
        res.status(200).json(post);
      }
    });
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

    redis.del("posts");
    redis.del(`post:${id}`);
    redis.del(`posts:user:${updatedPost.user}`);

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const post = await postModel.findByIdAndDelete(id);

    if (post) {
      redis.del("posts");
      redis.del(`post:${id}`);
      redis.del(`posts:user:${post.user}`);
    }

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

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await post.save();

    redis.del("posts");
    redis.del(`post:${postId}`);
    redis.del(`posts:user:${post.user}`);

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

    redis.del("posts");
    redis.del(`post:${postId}`);
    redis.del(`posts:user:${post.user}`);

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

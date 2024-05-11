const express = require('express');
const jwt = require('jsonwebtoken');

const {
    createPost,
    getAllPosts,
    getPostsByUser,
    updatePost,
    deletePost,
    likePost,
    commentOnPost
} = require('../controllers/postController.js');


const router = express.Router();

router.post('/', createPost);

router.get('/', getAllPosts);

router.get('/user/:userId', getPostsByUser);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.put('/:postId/like', likePost);

router.put('/:postId/comment', commentOnPost);
module.exports = router;

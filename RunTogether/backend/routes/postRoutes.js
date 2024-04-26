const express = require('express');
const {
    createPost,
    getAllPosts,
    getPostsByUser,
    updatePost,
    deletePost
} = require('../controllers/postController.js');

const router = express.Router();

router.post('/', createPost);

router.get('/', getAllPosts);

router.get('/user/:userId', getPostsByUser);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;

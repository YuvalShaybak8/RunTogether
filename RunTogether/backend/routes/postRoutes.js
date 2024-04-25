import express from 'express';
import {
    createPost,
    getAllPosts,
    getPostsByUser,
    updatePost,
    deletePost
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);

router.get('/', getAllPosts);

router.get('/user/:userId', getPostsByUser);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;

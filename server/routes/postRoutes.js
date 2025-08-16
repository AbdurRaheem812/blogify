import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import { fetchAllPosts, createNewPost, getPostById, updatePost, deletePost, getMyPosts } from '../controllers/post.js';
import { get } from 'mongoose';

const router = express.Router();

// This route fetches all posts with their authors populated
router.get('/', fetchAllPosts);

// Create a new post
router.post('/', authMiddleware, createNewPost)

// Get a single post by author ID   
router.get('/:id', getPostById)

// This route allows the author of the post to update it
router.put('/:id',authMiddleware, updatePost)

// This route allows the author of the post to delete it
router.delete('/:id',authMiddleware, deletePost)

// Get all posts of the logged-in user
router.get('/my-posts', authMiddleware, getMyPosts);

// Export the router
export default router;
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import { fetchAllPosts, createNewPosts, getPostById, updatePost, deletePost } from '../controllers/post.js';

const router = express.Router();

// This route fetches all posts with their authors populated
router.get('/', fetchAllPosts);
// Create a new post
router.post('/', authMiddleware, createNewPosts)

// Get a single post by author ID   
router.get('/:id', getPostById)

// This route allows the author of the post to update it
router.put('/:id',authMiddleware, updatePost)

// This route allows the author of the post to delete it
router.delete('/:id',authMiddleware, deletePost)

// Export the router
export default router;
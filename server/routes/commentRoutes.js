import express from 'express';
import { createNewComment, getCommentsByPostId, deleteCommentById } from '../controllers/commentController.js';

const router = express.Router();

// Create a new comment
router.post('/post/:id/comments', createNewComment)
// Get comments by post ID
router.get('/post/:id/comments', getCommentsByPostId)
// Delete a comment by ID
router.delete('/comments/:id', deleteCommentById)   
    
// Export the router
export default router;

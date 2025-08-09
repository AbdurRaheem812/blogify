import express from 'express';
import Comment from '../models/comment.js';

const router = express.Router();

// Create a new comment
router.post('/post/:id/comments', async (req, res) => {
    const { text, user } = req.body;
    const postId = req.params.id;
    try {
        const newComment = new Comment({
            text,
            user,
            postId
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
    })

router.get('/post/:id/comments', async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ postId }).populate('user', 'username');
        res.status(200).json(comments); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
})

router.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
    })   
    
// Export the router
export default router;
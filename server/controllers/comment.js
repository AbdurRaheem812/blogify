// controllers/commentController.js
import {
    createCommentService,
    getCommentsByPostIdService,
    deleteCommentByIdService
} from "../services/comment.js";

// Create new comment
const createNewComment = async (req, res) => {
    try {
        const savedComment = await createCommentService({
            text: req.body.text,
            user: req.body.user,
            postId: req.params.id
        });
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get comments by post ID
const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await getCommentsByPostIdService(req.params.id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete comment by ID
const deleteCommentById = async (req, res) => {
    try {
        const result = await deleteCommentByIdService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Comment not found' ? 404 : 500;
        res.status(statusCode).json({ message: error.message });
    }
};

export { createNewComment, getCommentsByPostId, deleteCommentById };

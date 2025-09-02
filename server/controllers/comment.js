import {
    createCommentService,
    getCommentsByPostIdService,
    deleteCommentByIdService,
    toggleLikeCommentService
} from '../services/comment.js';

export const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const user = req.user._id;
        const postId = req.post._id;

        const newComment = await createCommentService({ text, user, postId });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.post._id;
        const comments = await getCommentsByPostIdService(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const commentId = req.params._id;
        const userId = req.user._id;
        const deletedComment = await deleteCommentByIdService(commentId, userId);
        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const toggleLikeComment = async (req, res) => {
    try {
        const commentId = req.comments._id;
        const userId = req.user._id;
        const updatedComment = await toggleLikeCommentService(commentId, userId);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

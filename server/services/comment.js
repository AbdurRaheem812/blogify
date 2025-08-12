// services/comment.js
import Comment from "../models/comment.js";

// Create new comment
const createCommentService = async ({ text, user, postId }) => {
    const newComment = new Comment({
        text,
        user,
        postId
    });
    return await newComment.save();
};

// Get comments by post ID
const getCommentsByPostIdService = async (postId) => {
    return await Comment.find({ postId })
        .populate('user', 'username');
};

// Delete comment by ID
const deleteCommentByIdService = async (commentId) => {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
        throw new Error('Comment not found');
    }
    return { message: 'Comment deleted successfully' };
};

export {
    createCommentService,
    getCommentsByPostIdService,
    deleteCommentByIdService
};

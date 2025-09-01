import Comment from '../models/comments.js'

export const createCommentService = async ({ text, user, postId }) => {
  try {
    const comment = new Comment({
      content: text,
      userId: user,
      postId,
    });

    const savedComment = await comment.save();
    return savedComment;
  } catch (error) {
    throw new Error(`Error creating comment: ${error.message}`);
  }
};

export const getCommentsByPostIdService = async (postId) => {
  try {
    const comments = await Comment.find({ postId })
      .populate("userId", "_id username")
      .sort({ createdAt: -1 });

    return comments;
  } catch (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }
};

export const deleteCommentByIdService = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId.toString() !== userId.toString()) {
      throw new Error("User not authorized to delete this comment");
    }

    await comment.deleteOne();
    return comment;
  } catch (error) {
    throw new Error(`Error deleting comment: ${error.message}`);
  }
};

export const toggleLikeCommentService = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();
    return comment;
  } catch (error) {
    throw new Error(`Error toggling like on comment: ${error.message}`);
  }
};

import Comment from "../models/comments.js";


export const createCommentService = async ({ text, userId, postId }) => {
  const newComment = new Comment({ text, userId, postId });
  const saved = await newComment.save();
  return saved.populate("userId", "_id username");
};


export const getCommentsByPostIdService = async (postId) => {
  return Comment.find({ postId })
    .populate("userId", "_id username")
    .sort({ createdAt: -1 });
};


export const deleteCommentByIdService = async ({ commentId, userId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  if (comment.userId.toString() !== userId.toString()) {
    throw new Error("NOT_AUTHORIZED");
  }

  await comment.deleteOne();
  return true;
};


export const toggleLikeCommentService = async ({ commentId, userId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  if (comment.likes.includes(userId)) {
    comment.likes.pull(userId);
  } else {
    comment.likes.push(userId);
  }

  await comment.save();
  return comment;
};
 
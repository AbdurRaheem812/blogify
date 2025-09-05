import {
  createCommentService,
  getCommentsByPostIdService,
  deleteCommentByIdService,
  toggleLikeCommentService,
} from "../services/comments.js";


export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
      return res.status(400).json({ error: "Comment text is required" });
    }
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const comment = await createCommentService({
      text,
      userId: req.user._id,
      postId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getCommentsByPostIdService(postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    const result = await deleteCommentByIdService({
      commentId,
      userId: req.user._id,
    });

    if (!result) return res.status(404).json({ error: "Comment not found" });

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    if (error.message === "NOT_AUTHORIZED") {
      return res.status(403).json({ error: "Not authorized" });
    }
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: error.message });
  }
};


export const toggleLikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const updated = await toggleLikeCommentService({
      commentId,
      userId: req.user._id,
    }); 

    if (!updated) return res.status(404).json({ error: "Comment not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ error: error.message });
  }
};

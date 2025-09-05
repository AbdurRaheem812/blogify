import express from "express";
import {
  createComment,
  getCommentsByPostId,
  deleteCommentById,
  toggleLikeComment,
} from "../controllers/comments.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/posts/:postId/comments", authMiddleware, createComment);
router.get("/posts/:postId/comments", getCommentsByPostId);
router.delete("/comments/:commentId", authMiddleware, deleteCommentById);
router.post("/comments/:commentId/likes", authMiddleware, toggleLikeComment);

export default router;
 
import express from "express";
import {
    createComment,
    getCommentsByPostId,
    deleteCommentById,
    toggleLikeComment
} from "../controllers/comment.js";

const router = express.Router();

router.post("/posts/:postId/comments", createComment);
router.get("/posts/:postId/comments", getCommentsByPostId);
router.delete("/comments/:commentId", deleteCommentById);
router.post("/comments/:commentId/likes", toggleLikeComment);

export default router;

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", authMiddleware, createPost); 
router.get("/:id", getPostById); 
router.put("/edit-post/:id", authMiddleware, updatePost); 
router.delete("/:id", authMiddleware, deletePost); 

export default router;

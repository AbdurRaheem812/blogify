// controllers/postController.js
import {
    fetchAllPostsService,
    createPostService,
    getPostByIdService,
    updatePostService,
    deletePostService
} from '../services/post.js';

// Fetch all posts
const fetchAllPosts = async (req, res) => {
    try {
        const posts = await fetchAllPostsService();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new post
const createNewPost = async (req, res) => {
    try {
        const savedPost = await createPostService({
            title: req.body.title,
            content: req.body.content,
            userId: req.user._id
        });
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get post by ID
const getPostById = async (req, res) => {
    try {
        const post = await getPostByIdService(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        const statusCode = error.message === 'Post not found' ? 404 : 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// Update post
const updatePost = async (req, res) => {
    try {
        const updatedPost = await updatePostService({
            postId: req.params.id,
            title: req.body.title,
            content: req.body.content,
            userId: req.user._id
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        const statusCode = ['Post not found', 'You are not authorized to update this post'].includes(error.message) ? 403 : 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
        const result = await deletePostService({
            postId: req.params.id,
            userId: req.user._id
        });
        res.status(200).json(result);
    } catch (error) {
        const statusCode = ['Post not found', 'You are not authorized to delete this post'].includes(error.message) ? 403 : 500;
        res.status(statusCode).json({ message: error.message });
    }
};

export { fetchAllPosts, createNewPost, getPostById, updatePost, deletePost };

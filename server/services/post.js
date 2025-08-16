// services/post.js
import Post from '../models/post.js';

// Fetch all posts
const fetchAllPostsService = async () => {
    return await Post.find()
        .populate('author', 'username email')
        .sort({ createdAt: -1 });
};

// Create a new post
const createPostService = async ({ title, content, userId }) => {
    const newPost = new Post({
        title,
        content,
        author: userId
    });
    return await newPost.save();
};

// Get post by ID
const getPostByIdService = async (postId) => {
    const post = await Post.findById(postId)
        .populate('author', 'username email');
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
};

// Update post 
const updatePostService = async ({ postId, title, content, userId }) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    if (post.author.toString() !== userId.toString()) {
        throw new Error('You are not authorized to update this post');
    }
    post.title = title;
    post.content = content;
    return await post.save();
};

// Delete post
const deletePostService = async ({ postId, userId }) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    if (post.author.toString() !== userId.toString()) {
        throw new Error('You are not authorized to delete this post');
    }
    await post.deleteOne();
    return { message: 'Post deleted successfully' };
};

// Get posts of a specific user
const getMyPostsService = async (userId) => {
    return await Post.find({ author: userId })
        .populate('author', 'username email')
        .sort({ createdAt: -1 });
};

export {
    fetchAllPostsService,
    createPostService,
    getPostByIdService,
    updatePostService,
    deletePostService,
    getMyPostsService
};

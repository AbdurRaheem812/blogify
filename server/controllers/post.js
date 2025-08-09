import Post from '../models/post.js';

// This controller handles fetching all posts, creating a new post, getting a post by ID, updating a post, and deleting a post.
const fetchAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('auther', 'username email')
            .sort({ createdAt: -1 });//latest posts first 
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
}

// This controller handles creating a new post
const createNewPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({
            title,
            content,
            author: req.user._id // Assuming req.user is set by authMiddleware
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
}

// This controller handles getting a post by its ID
// It populates the author field with the author's username and email.
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('auther', 'username email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
}


// This controller handles updating a post
// It checks if the user is the author of the post before allowing the update.
const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }
        post.title = title;
        post.content = content;
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
}

// This controller handles deleting a post
// It checks if the user is the author of the post before allowing the deletion.
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }
        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
}

export { fetchAllPosts, createNewPost, getPostById, updatePost, deletePost };
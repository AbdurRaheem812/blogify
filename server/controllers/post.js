import {
  getAllPostsService,
  createPostService,
  getPostByIdService,
  updatePostService,
  deletePostService,
} from "../services/post.js"; 

// GET /api/posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/posts
export const createPost = async (req, res) => {
  try {
    const post = await createPostService(req.body, req.user._id);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await getPostByIdService(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const updated = await updatePostService(req.params.id, req.body, req.user._id);
    res.json(updated);
  } catch (err) {
    const code = err.message === "Not authorized" ? 403 : 404;
    res.status(code).json({ message: err.message });
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const deleted = await deletePostService(req.params.id, req.user._id);
    res.json({ message: "Post deleted", post: deleted });
  } catch (err) {
    const code = err.message === "Not authorized" ? 403 : 404;
    res.status(code).json({ message: err.message });
  }
};

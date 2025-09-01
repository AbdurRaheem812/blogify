import Post from "../models/post.js";

// Get all posts
export const getAllPostsService = async () => {
  return Post.find().populate("author", "username email").sort({ createdAt: -1 });
};
 
// Create new post
export const createPostService = async (data, userId) => {
  const post = new Post({ ...data, author: userId });
  return post.save();
};

// Get single post
export const getPostByIdService = async (id) => {
  return Post.findById(id).populate("author", "username email");
};

// Update post (only owner)
export const updatePostService = async (id, data, userId) => {
  const post = await Post.findById(id);
  if (!post) throw new Error("Post not found");
  if (post.author.toString() !== userId.toString()) throw new Error("Not authorized");

  Object.assign(post, data);
  return post.save();
};

// Delete post (only owner)
export const deletePostService = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) throw new Error("Post not found");
  if (post.author.toString() !== userId.toString()) throw new Error("Not authorized");

  await post.deleteOne();
  return post;
};


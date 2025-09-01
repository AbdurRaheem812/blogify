import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Post from "../models/post.js";

 
// DO NOT hash here; model pre-save already hashes.
export const signupUser = async (username, email, password) => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error("User already exists");

  const existingUsername = await User.findOne({ username });
  if (existingUsername) throw new Error("Username is taken");

  const user = await User.create({ username, email, password });
  return { id: user._id, email: user.email, username: user.username };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user: { id: user._id, email: user.email, username: user.username } };
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const getMyProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }

  const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

  return { user, posts };
}; 
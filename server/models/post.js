import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Post = mongoose.model("Post", postSchema);
export default Post;

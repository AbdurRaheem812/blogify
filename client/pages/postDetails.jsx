import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, isAuthenticated } from "../src/utils/auth.js";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      navigate("/posts");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (!post) return <p className="container mt-4">Loading post...</p>;

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>By {post.author?.username} on {new Date(post.createdAt).toLocaleDateString()}</small>

      {isAuthenticated() && (
        <div className="mt-3">
          <Link to={`/edit-post/${post._id}`} className="btn btn-warning me-2">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../src/utils/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const token = getToken();
      const res = await axios.get("http://localhost:5000/api/posts/my-posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = getToken();
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Posts</h2>
        <Link to="/new-post" className="btn btn-primary">+ New Post</Link>
      </div>
      {myPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="list-group">
          {myPosts.map(post => (
            <div key={post._id} className="list-group-item">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>Posted on: {new Date(post.createdAt).toLocaleDateString()}</small>
              <div className="mt-2">
                <Link to={`/posts/edit/${post._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(post._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

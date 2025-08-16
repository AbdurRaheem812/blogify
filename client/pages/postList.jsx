import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Posts</h2>
      <div className="list-group">
        {posts.map(post => (
          <Link key={post._id} to={`/posts/${post._id}`} className="list-group-item list-group-item-action">
            <h4>{post.title}</h4>
            <small>By {post.author?.username || "Unknown"}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostList;

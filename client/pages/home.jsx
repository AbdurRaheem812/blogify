import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../src/utils/api"

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts"); 
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {posts.length === 0 ? (
        <p className="text-center text-muted">No posts available yet.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4 mb-4" key={post._id}>
              <div className="card h-100 shadow-sm">
                {post.image && (
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt={post.title}
                    style={{ objectFit: "cover", height: "200px", width: "100%", marginTop: "10px" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-truncate">{post.content}</p>
                  <Link
                    to={`/posts/${post._id}`}
                    className="btn btn-dark mt-auto"
                  >
                    Read More
                  </Link>
                </div>
                <div className="card-footer text-muted">
                  By {post.author?.username || "Unknown"} on{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

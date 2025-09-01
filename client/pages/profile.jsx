import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../src/utils/api";
import { getToken } from "../src/utils/auth";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user || null);
        setPosts(res.data.posts || []);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

   

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-muted">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-3 text-center">
          
        </div>
        <div className="col-md-9">
          <h3>{user.username}</h3>

          <div className="d-flex mb-3">
            <span className="me-4">
              <strong>{posts.length}</strong> posts
            </span>
            <span className="me-4">
              <strong>{user.followers?.length || 0}</strong> followers
            </span>
            <span>
              <strong>{user.following?.length || 0}</strong> following
            </span>
          </div>

          <button
            className="btn btn-dark btn-sm"
            onClick={() => navigate("/create")}
          >
            Create Post
          </button>
        </div>
      </div>

      <hr />

      <div className="row">
        {posts.length === 0 ? (
          <p className="text-center">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div className="col-md-4 mb-4" key={post._id}>
              <div className="card h-100">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/posts/${post._id}`)}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content.slice(0, 100)}...</p>
                  <div className="text-center">
                    <button
                      className="btn btn-dark btn-sm me-2"
                      onClick={() => navigate(`/edit-post/${post._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        try {
                          const token = getToken();
                          await api.delete(`/posts/${post._id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          setPosts(posts.filter((p) => p._id !== post._id));
                        } catch (err) {
                          console.error("Failed to delete post", err);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

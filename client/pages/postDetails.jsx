import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../src/utils/api";
import Comments from "../components/comments";
import { FaRegComment, FaRegHeart} from "react-icons/fa";

const PostDetail = () => {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError("Failed to load post.");
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

// const handleToggleLike = async () => {
//   if (!currentUser) {
//     setError("You must be logged in to like posts.");
//     return;
//   }
//   if (!post) return;

//   const prevPost = { ...post };
//   const hasLiked = post.likes?.includes(currentUser._id);

  
//   const optimisticLikes = hasLiked
//     ? post.likes.filter((id) => id !== currentUser._id)
//     : [...(post.like || []), currentUser._id];

//   setPost({ ...post, likes: optimisticLikes });

//   try {
//     const token = localStorage.getItem("token");

//     const res = await api.post(
//       `/posts/${post._id}/like`,   
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setPost(res.data); 
//   } catch (err) {
//     setPost(prevPost);

//     if (err.response?.status === 401) {
//       setError("You must be logged in to like posts.");
//     } else {
//       setError("Failed to update like. Please try again.");
//     }
//   }
// };


  return (
    <div className="container py-4">
      <div className="card shadow-sm flex-row p-3">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="card-img-top"
            style={{
              height: "250px",
              objectFit: "cover",
              cursor: "pointer",
              width: "30%",
            }}
            onClick={() => navigate(`/posts/${post._id}`)}
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{post.title || "Untitled Post"}</h5>
          <p className="card-text">{post.caption || post.content}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-3">
              {post.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <FaRegHeart
        size={24}
        style={{
          cursor: "pointer",
          marginRight: "10px",
          color: post.like?.includes(currentUser._id) ? "red" : "black",
        }}
        onClick={handleToggleLike}
      /> */}
      <FaRegComment
        size={24}
        style={{ cursor: "pointer" }}
        onClick={() => setShowComments(!showComments)}
      />
      {showComments && <Comments postId={post._id} currentUser={currentUser} />}
    </div>
  );
};

export default PostDetail;

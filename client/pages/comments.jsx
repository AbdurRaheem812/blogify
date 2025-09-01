import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../src/utils/api";

const Comments = ({ currentUser }) => {
  const { postId } = useParams(); 
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/posts/${postId}/comments`, {
          withCredentials: true,
        });
        setComments(res.data);
      } catch (err) {
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE_URL}/posts/${postId}/comments`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      
      setComments([res.data, ...comments]);
      setText("");
    } catch (err) {
      setError("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  
  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError("Failed to delete comment.");
    }
  };

  // Format date nicely
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="comments-section">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>


      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border  p-2 mb-2"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-dark rounded-lg "
        >
          {submitting ? "Posting..." : "Submit"}
        </button>
      </form>


      {error && <p className="text-red-500 mb-2">{error}</p>}


      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="border rounded-lg p-3 flex justify-between items-start"
            >
              <div>
                <p className="font-medium">{comment.userId?.username}</p>
                <p className="text-gray-700">{comment.content}</p>
                <span className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              
              {comment.userId?._id === currentUser?._id && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  🗑
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;

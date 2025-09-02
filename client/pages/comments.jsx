import { useEffect, useState } from "react";
import api from "../src/utils/api";

const Comments = ({ currentUser, postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/posts/${postId}/comments`);
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
      const res = await api.post(`/posts/${postId}/comments`, {
        text,
      });

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
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError("Failed to delete comment.");
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <h5 className="mb-3">Comments</h5>

      {/* Error State */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-2">
              <textarea
                className="form-control"
                rows="2"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={submitting}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-dark btn-sm"
              disabled={submitting}
            >
              {submitting ? "Posting..." : "Submit"}
            </button>
          </form>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-muted">No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="list-group">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <strong>{comment.userId?.username}</strong>
                    <p className="mb-1">{comment.text}</p>
                    <small className="text-muted">
                      {formatDate(comment.createdAt)}
                    </small>
                  </div>

                  {comment.userId?._id === currentUser?._id && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="btn btn-outline-danger btn-sm ms-2"
                      title="Delete comment"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;

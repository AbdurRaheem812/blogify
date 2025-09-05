import { useEffect, useState, useCallback } from "react";
import { FaTrash, FaRegHeart } from "react-icons/fa";
import api from "../src/utils/api";

const Comments = ({ currentUser, postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await api.get(`/posts/${postId}/comments`);
      setComments(res.data);
    } catch (err) {
      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setSubmitting(true);
      await api.post(`/posts/${postId}/comments`, { text });
      setText("");
      await fetchComments();
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
      await fetchComments(); 
    } catch (err) {
      setError("Failed to delete comment.");
    }
  };

  const handleToggleLike = async (commentId) => {
    try {
      await api.post(`/comments/${commentId}/likes`);
      await fetchComments(); 
    } catch (err) {
      setError("Failed to toggle like.");
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

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>

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

          {comments.length === 0 ? (
            <p className="text-muted">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <ul className="list-group">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <strong>{comment.userId?.username || "Unknown User"}</strong>
                    <p className="mb-1">{comment.text}</p>
                    <small className="text-muted">
                      {formatDate(comment.createdAt)}
                    </small>
                    <div className="mt-2">
                      <button
                        onClick={() => handleToggleLike(comment._id)}
                        className="btn btn-outline-light btn-sm me-2 border"
                        type="button"
                      >
                        <FaRegHeart className="text-danger" />{" "}
                        {comment.likes?.length || 0}
                      </button>
                    </div>
                  </div>

                  {comment.userId?._id === currentUser?._id && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="btn btn-outline-danger btn-sm"
                      title="Delete comment"
                      type="button"
                    >
                      <FaTrash />
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

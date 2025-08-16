import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../src/utils/auth";

const PostForm = ({ isEdit = false }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(err => console.error(err));
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content }, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      } else {
        await axios.post("http://localhost:5000/api/posts", { title, content }, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title}
            onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" rows="5" value={content}
            onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;

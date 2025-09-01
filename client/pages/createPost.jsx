import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../src/utils/api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(""); 

  const navigate = useNavigate();
   
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const newPost = {
        title,
        content,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        image: image || null, 
      };

      const res = await api.post("/posts", newPost, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Post created:", res.data);
      alert("Post created successfully!");
      navigate('/profile');
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Image picker via system file explorer */}
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-2"
              style={{ width: "150px", borderRadius: "8px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-dark">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

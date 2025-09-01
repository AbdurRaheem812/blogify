import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";

import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/profile";
import CreatePost from "../pages/createPost";
import PostDetail from "../pages/postDetails";
import EditPost from "../pages/editPost";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

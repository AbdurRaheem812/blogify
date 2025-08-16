import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import Signup from '../pages/signup.jsx';
import Login from '../pages/login.jsx';
import ProtectedRoute from '../components/protectedRoute.jsx';
import Profile from '../pages/profile.jsx';
import PostList from '../pages/postList.jsx';
import PostDetail from '../pages/postDetails.jsx';
import NewPost from '../pages/newPost.jsx';
import EditPost from '../pages/editPost.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/new-post" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
        <Route path="/posts/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

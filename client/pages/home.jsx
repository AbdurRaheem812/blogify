import { useNavigate } from "react-router-dom";
import { removeToken } from "../src/utils/auth.js";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;

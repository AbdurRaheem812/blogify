import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { 
      _id: decoded.id, 
      username: decoded.username, 
      email: decoded.email 
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;

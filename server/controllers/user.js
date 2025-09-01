import {
  signupUser,
  loginUser,
  verifyToken,
  getMyProfileService
} from "../services/user.js";


export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await signupUser(username, email, password);
    res.status(201).json({ user, message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    res.json({ user, message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const logout = (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    path: "/",
  });
  res.json({ message: "Logged out" });
};

export const getMyProfile = async (req, res) => {
  try {
    const result = await getMyProfileService(req.user._id);
    res.status(200).json(result);
  } catch (err) {
    const statusCode = err.message === "User not found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
};

export const verify = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: err.message });
  }
};
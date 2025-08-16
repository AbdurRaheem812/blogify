import { signupUser, loginUser, verifyToken } from "../services/user.js";

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        await signupUser(email, password);
        res.json({ message: "Signup successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await loginUser(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set true in production with HTTPS
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getMe = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    try {
        const decoded = verifyToken(token);
        res.json({ email: decoded.email });
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};

import { signupUser, loginUser, logoutUser } from '../services/user.js';

// Signup Controller
const handleSignup = async (req, res) => {
    try {
        const userData = await signupUser(req.body);
        return res.status(201).json(userData);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Login Controller
const handleLogin = async (req, res) => {
    try {
        const { userData, token } = await loginUser(req.body);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // change to true in production
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Logout Controller
const handleLogout = async (req, res) => {
    try {
        const result = logoutUser();
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: false
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export { handleSignup, handleLogin, handleLogout };


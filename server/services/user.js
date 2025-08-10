import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// Signup service
const signupUser = async ({ username, email, password }) => {
    if (!(username && email && password)) {
        throw new Error("All fields are not filled");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists!");
    }

    // Hash password
    const encPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        email,
        password: encPassword
    });

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    user.token = token;
    await user.save();

    const userData = user.toObject();
    delete userData.password;

    return userData;
};

// Login service
const loginUser = async ({ email, password }) => {
    if (!(email && password)) {
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found. Please sign up first.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user._id, email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    const userData = user.toObject();
    delete userData.password;

    return { userData, token };
};

// Logout service (if you want business logic here)
const logoutUser = () => {
    return { message: 'Logged out successfully' };
};

export { signupUser, loginUser, logoutUser };

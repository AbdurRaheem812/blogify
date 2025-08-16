import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Temporary in-memory user storage
const users = [];

export const signupUser = async (email, password) => {
    if (users.find(u => u.email === email)) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };
    users.push(user);

    return { email: user.email };
};

export const loginUser = async (email, password) => {
    const user = users.find(u => u.email === email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });

    return { token, user: { email: user.email } };
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

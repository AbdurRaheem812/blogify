import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';


// This controller handles user signup
const handleSignup = async (req, res) => { async (req, res)=>{
    try {
        //get all the data from body
        const {username ,email ,password}= req.body;
        //all the data should exist
        if(!(username && email && password)) {
            res.status(400).json({message:"All fields are not filled"});
        }
        //check the user exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).json("User already exist!");
        }
        //encrypt the password
        const encPassword = await bcrypt.hash(password, 10);
        //save the user in db
        const user = await User.create({
            username,
            email,
            password: encPassword
        })
        //generate a token for user
        const token= jwt.sign(
            {id: user._id, email},
            process.env.JWT_SECRET,
            {
                 expiresIn: "2h"
            }
        )
        user.token = token;
        await user.save();

        const userData = user.toObject();
        delete userData.password;
        
        res.status(201).json(userData)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
}
}


// This controller handles user login
const handleLogin = async (req, res) => {try {
        const { email, password } = req.body;

        // Validate input
        if (!(email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up first." });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,     // cannot access from JS on frontend
            secure: false,      // set to true in production with HTTPS
            sameSite: 'strict', // for CSRF protection
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        // Send user data without password
        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({ message: "Login successful", user: userData });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

// Logout
const handleLogout= async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: false // change to true in production with HTTPS
    });

    return res.status(200).json({ message: 'Logged out successfully' });
};

// Export the functions
export { handleSignup, handleLogin, handleLogout };
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Schema
const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true 
    },
    token:{
        type: String,
        default: null
    }
})

// Export 
const User = mongoose.model('User',userSchema)
export default User;

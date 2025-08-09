import mongoose from "mongoose";

// Post Schema
const postSchema = mongoose.Schema({
    title: {    
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },  
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
},{timeStamps: true});

// Export
const Post = mongoose.model('Post', postSchema);
export default Post;
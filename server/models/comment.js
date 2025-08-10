import mongoose from "mongoose";

// Comment Schema
const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
    
},
    { timeStamps: true });

// Export
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;




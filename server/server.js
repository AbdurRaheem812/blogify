import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

//initialize express app
const app = express();
const PORT = process.env.PORT;


//DB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log("Mongo connection error", err))


//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

//Server listening
app.listen(PORT || 5000, () => { console.log(`Server is started at PORT:${PORT}`) });


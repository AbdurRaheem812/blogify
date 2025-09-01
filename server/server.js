import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// --- DB ---
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Mongo Connected'))
  .catch(err => console.error('Mongo connection error', err));

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// CORS: allow Vite dev server and cookies
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// --- Start ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

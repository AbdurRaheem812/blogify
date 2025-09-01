import express from 'express';
import { signup, login, logout, getMyProfile } from '../controllers/user.js'; 
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authMiddleware, getMyProfile); 

export default router;
 
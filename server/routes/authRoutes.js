import express from 'express';
import { handleLogin, handleSignup, handleLogout } from '../controllers/user.js';   

const router = express.Router();

router.post('/signup',handleSignup)


router.post('/login', handleLogin);

// Logout
router.get('/logout', handleLogout);


export default router;
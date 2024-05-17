import express from "express";
import {signup, login, logout} from '../controllers/authController.js';
import {authenticateRefreshToken} from '../middlewares/jwt.js';

const router = express.Router();

// signup route
router.post('/signup', signup);

// login route
router.post('/login', login);

// logout route
router.get('/logout', logout);

// refresh token route
router.post('/refreshToken', authenticateRefreshToken);

export default router;
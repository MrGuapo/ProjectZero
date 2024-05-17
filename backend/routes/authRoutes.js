import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// signup route
router.post('/signup', authController.signup);

// login route
router.post('/login', authController.login);

export default router;
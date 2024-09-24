import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Sign Up 
router.post('/signup', signup);

// Sign In
router.post('/signin', signin);

// Google OAuth
router.post('/google', google)

export default router;
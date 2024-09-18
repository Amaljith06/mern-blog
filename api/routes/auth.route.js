import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Sign Up Route
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
import express from 'express';
import { test } from '../controllers/user.controller.js';

//Router from express
const router = express.Router();

//test route
router.get('/test', test);

export default router;
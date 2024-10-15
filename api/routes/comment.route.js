import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createComment } from "../controllers/comment.controller.js";

const router = express.Router();

// post a comment
router.post("/create", verifyToken, createComment);

export default router;

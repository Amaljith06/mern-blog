import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

// post a comment
router.post("/create", verifyToken, createComment);

// get the comments
router.get("/getPostComments/:postId", getPostComments);

export default router;

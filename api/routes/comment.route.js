import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  editComment,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// post a comment
router.post("/create", verifyToken, createComment);

// get the comments
router.get("/getPostComments/:postId", getPostComments);

// like/unlike comment
router.put("/likeComment/:commentId", verifyToken, likeComment);

// edit comment
router.put("/editComment/:commentId", verifyToken, editComment);

export default router;

import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletePost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

//create post
router.post("/create", verifyToken, create);

// get post
router.get('/getposts', getPosts)

// delete post
router.delete('/deletepost/:postid/:userId', verifyToken, deletePost);
export default router;

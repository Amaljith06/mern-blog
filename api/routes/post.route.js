import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

//create post
router.post("/create", verifyToken, create);

// get post
router.get('/getposts', getPosts)

// delete post
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);

// update post
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)
export default router;

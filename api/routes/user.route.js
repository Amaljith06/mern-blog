import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

//Router from express
const router = express.Router();

//test route
router.get("/test", test);

//update user
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);

export default router;

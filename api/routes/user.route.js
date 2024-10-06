import express from "express";
import {
  deleteUser,
  getUsers,
  signOut,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

//Router from express
const router = express.Router();

//test route
router.get("/test", test);

//update user
router.put("/update/:userId", verifyToken, updateUser);

//delete user
router.delete("/delete/:userId", verifyToken, deleteUser);

//sign out user
router.post("/signout", signOut);

// get user info
router.get("/getusers", verifyToken, getUsers);
export default router;

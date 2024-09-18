import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// Sign Up
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // Create an error and pass to middleware
    next(errorHandler(400, "All fields are required!"));
  }

  // Hash Password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create User
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save(); // Add to DB
    res.json("Signup successful!");
  } catch (error) {
    next(error); // Send error to middleware
  }
};

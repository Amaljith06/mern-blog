import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// Sign Up
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required!" });
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
    await newUser.save();   // add to DB
    res.json("Signup successful!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

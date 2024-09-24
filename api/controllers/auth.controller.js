import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    await newUser.save(); // save user to DB
    res.json("Signup successful!");
  } catch (error) {
    next(error); // Send error to middleware
  }
};

// Sign In

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    // Create an error and pass to middleware
    next(errorHandler(400, "All fields are required!"));
  }

  try {
    //email and password validation
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not Found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password!"));
    }

    //create token using JWT
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    // exclude password
    const { password: pass, ...userWithoutPassword } = validUser._doc;
    //Send response with token in cookie
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

//google authentication
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    //check if user exist
    const user = await User.findOne({ email });
    // if user exist, create token and send response
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...userWithoutPassword } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(userWithoutPassword);
    } else {
      //create random password for user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // hash password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      //create User
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4), //eg: firstNamelastName1645
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      // save user to the database
      await newUser.save();
      // create token and send response
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...userWithoutPassword } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(userWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};

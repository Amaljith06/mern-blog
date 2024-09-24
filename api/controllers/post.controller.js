import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  // check if user is admin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  // check if all fields are filled
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please proide all required fields"));
  }

  // create slug
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  // create new post
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save(); // save to DB
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

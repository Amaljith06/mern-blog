import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from 'path';

// Configure .env
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// gives the directory path of the currently executing script.
const __dirname = path.resolve();

// Create express app
const app = express();

app.use(express.json());

//extract cookie from browser
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

//serve all static assets
app.use(express.static(path.join(__dirname, '/client/dist')));

// serve index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Servor Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

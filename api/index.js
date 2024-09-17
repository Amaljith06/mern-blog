import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

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

// Create express app
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use('/api/user', userRoutes);


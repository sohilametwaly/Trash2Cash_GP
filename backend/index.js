import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import connectToDB from "./config/db.js";
import userRoute from "./routes/user.js";

const app = express();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectToDB();
});

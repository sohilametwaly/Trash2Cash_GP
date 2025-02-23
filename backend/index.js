import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectToDB from "./config/db.js";
import userRoute from "./routes/user.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectToDB();
});

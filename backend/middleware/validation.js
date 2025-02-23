import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const validateUser = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verify) {
      return res.status(401).json({ msg: "Not aithorized" });
    }

    const user = await User.findById(verify.userId).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("validation error: " + error);

    res.status(500).json({ msg: "Server error" });
  }
};

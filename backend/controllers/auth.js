import bcrypt from "bcrypt";

import { User } from "../models/user.js";
import { generateToken } from "../lib/token.js";
import { validationResult } from "express-validator";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validationRes = validationResult(req);
    if (validationRes.length > 0) {
      return res.status(400).json({ message: validationRe });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credintails." });
    }

    const token = generateToken(user._id);

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("sign in ", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, isCompany } = req.body;
  try {
    const validationRes = validationResult(req);
    if (validationRes.length > 0) {
      return res.status(400).json({ message: validationRes });
    }

    const user = await User.findOne({ email });
    console.log("user ", user);

    if (user) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role: isCompany ? "company" : "user",
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error("sign up ", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log("get profile ", error);
    res.status(500).json({ message: "Server error." });
  }
};

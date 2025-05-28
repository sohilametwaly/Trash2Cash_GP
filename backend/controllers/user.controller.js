import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.js";

export const changeProfileImg = async (req, res) => {
  try {
    console.log("profile image backend test");
    const { profileImg } = req.body;
    const user = await User.findById(req.user._id).select("-password");

    if (user.img) {
      await cloudinary.uploader.destroy(
        user.img.split("/").pop().split(".")[0]
      );
    }
    // console.log(profileImg);

    const response = await cloudinary.uploader.upload(profileImg);
    user.img = response.secure_url;
    await user.save();
    res.status(200).json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    console.log("error in change profile img controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await User.find({ role: "company" });
    res.status(200).json(companies);
  } catch (error) {
    console.log("error in get companies controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    console.log("error in get users controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

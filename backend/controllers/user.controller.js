import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.js";

export const changeProfileImg = async (req, res) => {
  try {
    const { profileImg } = req.body;
    const user = await User.findById(req.user._id).select("-password");

    if (user.img) {
      await cloudinary.uploader.destroy(
        user.img.split("/").pop().split(".")[0]
      );
    }
    console.log(profileImg);

    const response = await cloudinary.uploader.upload(profileImg);
    user.img = response.secure_url;
    await user.save();
    res.status(200).json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    console.log("error in change profile img controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

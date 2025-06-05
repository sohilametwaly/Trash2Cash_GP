import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.js";
import Order from "../models/order.js";

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

export const updateBalances = async (req, res) => {
  try {
    const { prices } = req.body;
    for (const [userId, price] of Object.entries(prices)) {
      const user = await User.updateOne(
        { _id: userId },
        { $inc: { balance: price } }
      );
      console.log("user ", user);
    }
    res.status(200).json({ message: "Balances updated successfully" });
  } catch (error) {
    console.log("error in update balances controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error in delete user controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

export const getAppIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const income = await Order.aggregate([
      {
        $match: {
          sellerIds: {
            $in: [userId],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);
    if (income.length === 0) {
      return res.status(200).json({ total: 0 });
    }
    res.status(200).json(income[0]);
  } catch (error) {
    console.log("error in getAppIncome user controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

export const getAppExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    const expenses = await Order.aggregate([
      {
        $match: {
          buyerId: userId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);
    if (expenses.length === 0) {
      return res.status(200).json({ total: 0 });
    }
    res.status(200).json(expenses[0]);
  } catch (error) {
    console.log("error in getAppExpenses user controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

export const getChartData = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Order.aggregate([
      {
        $match: {
          sellerIds: {
            $in: [userId],
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.wasteType",
          name: { $first: "$items.wasteType" },
          population: { $sum: "$items.quantity" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.log("error in getChartData user controller ", error);
    res.status(404).json({ error: "Server Error" });
  }
};

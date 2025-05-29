import { Inventory } from "../models/inventory.model.js";
import { validationResult } from "express-validator";

export const addItem = async (req, res) => {
  const { name, quantity, price } = req.body;
  const userId = req.user._id;
  try {
    const validationRes = validationResult(req);
    if (validationRes.errors.length > 0) {
      return res.status(400).json({ message: validationRes.errors });
    }

    const inventory = await Inventory.findOne({ userId });
    if (inventory) {
      const existingItem = inventory.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price = price;
      } else {
        inventory.items.push({ name, quantity, price });
      }
      await inventory.save();
      res.status(200).json({ message: "Item added successfully." });
    } else {
      const newInventory = new Inventory({
        userId,
        items: [{ name, quantity, price }],
      });
      await newInventory.save();
      res.status(200).json({ message: "Item added successfully." });
    }
  } catch (error) {
    console.log("Error in add item controller ", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const editItem = async (req, res) => {
  const { name, quantity, price } = req.body;
  console.log(`name ${name} quantity ${quantity} price ${price}`);

  const userId = req.user._id;
  try {
    const validationRes = validationResult(req);
    if (validationRes.errors.length > 0) {
      return res.status(400).json({ message: validationRes.errors });
    }

    const inventory = await Inventory.findOne({ userId });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found." });
    }

    const existingItem = inventory.items.find((item) => item.name === name);
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    existingItem.quantity = quantity;
    existingItem.price = price;
    await inventory.save();
    res.status(200).json({ message: "Item edited successfully." });
  } catch (error) {}
};

export const getItems = async (req, res) => {
  try {
    const items = await Inventory.findOne({ userId: req.user._id });
    res.status(200).json(items);
  } catch (err) {
    console.log("Error in get inventory items controller ", err);
    res.status(500).json({ message: "Server error." });
  }
};

export const getAdminShop = async (req, res) => {
  try {
    const userId = req.user._id;
    let inventories = await Inventory.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      { $match: { "userInfo.role": "company" } },
      {
        $project: {
          _id: 1,
          items: 1,
          userName: "$userInfo.name",
          companyId: "$userInfo._id",
        },
      },
    ]);
    inventories = inventories.filter((inv) => inv.userId != userId);
    res.status(200).json(inventories);
  } catch (error) {
    console.log("Error in get companies inventory controller ", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getCompanyShop = async (req, res) => {
  try {
    let inventories = await Inventory.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      { $match: { "userInfo.role": "admin" } },
      {
        $project: {
          _id: 1,
          items: 1,
          userName: "$userInfo.name",
        },
      },
    ]);
    res.status(200).json(inventories[0]);
  } catch (error) {
    console.log("Error in get admin inventory controller ", error);
    res.status(500).json({ message: "Server error." });
  }
};

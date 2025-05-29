import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

export const Inventory = mongoose.model("Inventory", InventorySchema);

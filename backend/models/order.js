import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ wasteType: String, quantity: Number, price: Number }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "delivered", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  pickupAddress: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

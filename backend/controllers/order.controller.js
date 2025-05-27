import Order from "../models/order.js";

const createOrder = async (req, res) => {
    try {
        const { buyerId, sellerIds, items, totalPrice, pickupDate, pickupTime, pickupAddress } = req.body;
        // console.log("buyerId ", buyerId);
        // console.log("sellerIds ", sellerIds);
        // console.log("items ", items);
        // console.log("totalPrice ", totalPrice);
        // console.log("pickupDate ", pickupDate);
        // console.log("pickupTime ", pickupTime);
        // console.log("pickupAddress ", pickupAddress);
        const order = new Order({ buyerId, sellerIds, items, totalPrice, pickupDate, pickupTime, pickupAddress });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrders = async (req, res) => {
    try {
        const { _id:userId } = req.user;
        const orders = await Order.find({ $or: [{buyerId: userId}, {sellerIds: userId}]});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if(order.status !== "pending") {
            return res.status(400).json({ message: `Order is ${order.status} already` });
        }
        const newOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const cancelOrder = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const order = await Order.findById(orderId);
//         if(order.status === "Delivered") {
//             return res.status(400).json({ message: "Order is already Delivered" });
//         }

//         if(order.status === "Cancelled") {
//             return res.status(400).json({ message: "Order is already Cancelled" });
//         }

//         const newOrder = await Order.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true });
//         res.status(200).json(newOrder);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

export { createOrder, getOrders, updateOrder };
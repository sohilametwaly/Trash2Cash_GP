import Cart from "../models/cart.js";

const addToCart = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { items } = req.body;
        console.log("items ", items);
        console.log("userId ", userId);
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
              items: [],
              totalPrice: 0
            });
        }

        items.forEach(newItem => {
            const existingItemIndex = cart.items.findIndex(
              item => item.wasteType === newItem.wasteType
            );
    
            if (existingItemIndex > -1) {
              cart.items[existingItemIndex].quantity += newItem.quantity;
            } else {
              // Add new item
              cart.items.push({
                wasteType: newItem.wasteType,
                quantity: newItem.quantity,
                price: newItem.price
              });
            }
          });

          cart.totalPrice = cart.items.reduce((sum, item) => 
            sum + (item.quantity * item.price), 0
          );
    
          await cart.save();
          res.status(200).json(cart);
    } catch (error) {
        console.error("Error in addToCart: ", error);
        res.status(500).json({ message: "Error adding to cart" });
    }
}

const getCart = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        let cart = await Cart.findOne({ userId });
        if(!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
            await cart.save();
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error in getCart: ", error);
        res.status(500).json({ message: "Error fetching cart" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { itemId } = req.params;
        const cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId.toString());
        if(itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        cart.items[itemIndex].quantity -= 1;
        if(cart.items[itemIndex].quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }
        cart.totalPrice -= cart.items[itemIndex].price;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error in removeFromCart: ", error);
        res.status(500).json({ message: "Error removing from cart" });
    }
}

const clearCart = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        await Cart.findOneAndDelete({ userId });
        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        console.error("Error in clearCart: ", error);
        res.status(500).json({ message: "Error clearing cart" });
    }
}

export { addToCart, getCart, removeFromCart, clearCart };
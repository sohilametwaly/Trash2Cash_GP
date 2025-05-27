import { Router } from "express";
// import { validateUser } from "../middleware/validation";
import {validateUser}  from "../middleware/validation.js";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cart.controller.js";
const router = Router();

router.post("/add", validateUser, addToCart)

router.get("/", validateUser, getCart)

router.put("/remove/:itemId", validateUser, removeFromCart)

router.delete("/clear", validateUser, clearCart)

export default router;

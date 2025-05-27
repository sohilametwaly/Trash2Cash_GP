import express from "express";
import { createOrder, getOrders, updateOrder} from "../controllers/order.controller.js";
import { validateUser } from "../middleware/validation.js";

const router = express.Router();

router.post("/add", validateUser, createOrder)

router.get("/", validateUser, getOrders)

router.patch("/:orderId", validateUser, updateOrder)



export default router;

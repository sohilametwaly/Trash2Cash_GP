import { Router } from "express";
import {
  addItem,
  getItems,
  editItem,
  getAdminShop,
  getCompanyShop,
} from "../controllers/inventory.controller.js";
import { validateUser } from "../middleware/validation.js";
import { validateInventory } from "../middleware/ValidateInventory.middleware.js";

const router = Router();

router.post("/add", validateUser, validateInventory, addItem);

router.get("/get", validateUser, getItems);

router.put("/edit", validateUser, validateInventory, editItem);

router.get("/adminShop", validateUser, getAdminShop);

router.get("/companyShop", validateUser, getCompanyShop);

export default router;

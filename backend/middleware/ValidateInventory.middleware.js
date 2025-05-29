import { body } from "express-validator";

export const validateInventory = [
  body("name").isLength({ min: 2 }).withMessage("Name is required"),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a number"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a number"),
];

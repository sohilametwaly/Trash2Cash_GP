import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

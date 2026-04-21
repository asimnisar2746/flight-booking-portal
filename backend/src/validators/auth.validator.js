import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
};

export const loginValidator = () => {
  return [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

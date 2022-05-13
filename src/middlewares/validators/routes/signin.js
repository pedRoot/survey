import { body } from "express-validator";

export const ruleValidSignin = [
  body("email", "Email must contain a valid email address")
    .isEmail()
    .notEmpty()
    .normalizeEmail(),
  body("password", "Password not valid")
    .notEmpty()
    .isLength({ min: 5, max: 12 })
    .trim()
    .escape(),
];

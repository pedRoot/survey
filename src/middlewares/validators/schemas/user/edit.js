import { body } from "express-validator";

export const rulesValidateEdit = [
  body("email", "Email must contain a valid email address")
    .isEmail()
    .notEmpty(),
  body("wasSelected", "Must contain a valid value")
    .optional()
    .isBoolean()
    .toBoolean(),
  body("isActive", "Must contain a valid value")
    .optional()
    .isBoolean()
    .toBoolean(),
];

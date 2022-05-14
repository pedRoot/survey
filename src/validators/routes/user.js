import { body, check } from 'express-validator';

export const validationId = [
  check('id')
    .notEmpty()
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Format invalid')
    .trim(),
];

export const validationUpdate = [
  body().exists().withMessage('Expect a body'),
  body('email')
    .isEmail()
    .withMessage('Format invalid')
    .optional()
    .normalizeEmail(),
  body('role')
    .optional()
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Format invalid')
    .trim(),
  body('password')
    .optional()
    .isLength({ min: 5, max: 12 })
    .withMessage('Format invalid')
    .trim()
    .escape(),
  body('confirm_password', 'Confirm password not is valid')
    .optional()
    .exists()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage('Password not confirmed'),
  body('isActive').optional().isBoolean(),
];

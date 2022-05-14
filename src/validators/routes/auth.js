import { body } from 'express-validator';

export const validationSignin = [
  body().exists().withMessage('Expect a body'),
  body('email', 'Email must contain a valid email address')
    .isEmail()
    .withMessage('Format invalid')
    .notEmpty()
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .isLength({ min: 5, max: 12 })
    .withMessage('Format invalid')
    .trim()
    .escape(),
];

export const validationSignup = [
  body().exists().withMessage('Expect a body'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Format invalid')
    .normalizeEmail(),
  body('password', 'Password not valid')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5, max: 12 })
    .withMessage('Length invalid')
    .trim()
    .escape(),
  body('confirm_password')
    .exists()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage('Password not confirmed'),
];

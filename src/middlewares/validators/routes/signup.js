import { body } from 'express-validator';
import { authJWT } from '../../index';

export const ruleValidSignup = [
  authJWT.isAdmin,
  body('email', 'Email must contain a valid email address')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Format invalid')
    .normalizeEmail(),
  body('password', 'Password not valid')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5, max: 12 })
    .withMessage('Length invalid')
    .trim()
    .escape(),
  body('confirm_password', 'Confirm password not is valid')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
    .withMessage('Password not confirmed'),
];

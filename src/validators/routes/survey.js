import { body, check } from 'express-validator';

export const validationId = [
  check('id')
    .optional()
    .notEmpty()
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Format invalid')
    .trim(),
];

export const validationAdd = [
  body().exists().withMessage('Expect a body'),
  body('title')
    .exists()
    .withMessage('Field required')
    .isString()
    .withMessage('Format invalid')
    .trim()
    .escape(),
  body('answer')
    .exists()
    .withMessage('Field required')
    .isArray({ min: 1 })
    .withMessage('Assert a array with values'),
  body('answer.*.title')
    .isString()
    .withMessage('Format invalid')
    .trim()
    .escape(),
  body('answer.*.isCorrectAnswer')
    .optional()
    .isBoolean()
    .withMessage('Format invalid'),
];

export const validationPath = [
  body().exists().withMessage('Expect a body'),
  body('title')
    .optional()
    .notEmpty()
    .isString()
    .withMessage('Format invalid')
    .trim()
    .escape(),
  body('answer.title').optional().isString().trim().escape(),
  body('answer.isCorrectAnswer').optional().isBoolean(),
];

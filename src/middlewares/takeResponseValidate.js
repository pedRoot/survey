import { validationResult } from 'express-validator';

export const manageResponse = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.mapped() });
};

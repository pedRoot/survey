import { validationResult } from "express-validator";

export function manageResponse(req, res, next) {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    res.status(422).json({ errors: err.mapped() });
  }
};

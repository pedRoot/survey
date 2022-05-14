import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
import { authJWT } from '../middlewares/index';
import { manageResponse } from '../middlewares/takeResponseValidate';
import { validationSignin, validationSignup } from '../validators/routes/auth';

const router = Router();

router.get('/signin', validationSignin, manageResponse, authController.signin);
router.post(
  '/signup',
  authJWT.isAdmin,
  validationSignup,
  manageResponse,
  authController.signup
);

export default router;

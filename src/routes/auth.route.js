import * as authController from '../controllers/auth.controller';
import { Router } from 'express';
import { authJWT } from '../middlewares';

import { ruleValidSignin } from '../middlewares/validators/routes/signin';
import { ruleValidSignup } from '../middlewares/validators/routes/signup';
import { manageResponse } from '../middlewares/takeResponseValidate';

const router = Router();

router.get('/signin', ruleValidSignin, manageResponse, authController.signin);
router.post('/signup', ruleValidSignup, manageResponse, authController.signup);

export default router;

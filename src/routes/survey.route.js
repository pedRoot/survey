import { Router } from 'express';

import { authJWT } from '../middlewares';
import * as surveyController from '../controllers/survey.controller';
import { manageResponse } from '../middlewares/takeResponseValidate';
import {
  validationId,
  validationAdd,
  validationPath,
} from '../validators/routes/survey';

const router = Router();

router.get(
  '/',
  authJWT.tokenVerification,
  manageResponse,
  surveyController.list
);
router.get(
  '/:id',
  authJWT.tokenVerification,
  validationId,
  manageResponse,
  surveyController.get
);
router.post(
  '/',
  authJWT.tokenVerification,
  validationAdd,
  manageResponse,
  surveyController.add
);
router.delete(
  '/:id',
  authJWT.tokenVerification,
  validationId,
  manageResponse,
  surveyController.remove
);
router.patch(
  '/:id',
  authJWT.tokenVerification,
  validationId,
  validationPath,
  manageResponse,
  surveyController.update
);

export default router;

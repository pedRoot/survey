import { Router } from 'express';

import { authJWT } from '../middlewares';
import { manageResponse } from '../middlewares/takeResponseValidate';
import { validationId, validationUpdate } from '../validators/routes/user';

import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.get('/:id', authJWT.isAdmin, validationId, manageResponse, userCtrl.get);
router.get('/', authJWT.isAdmin, manageResponse, userCtrl.list);
router.patch(
  '/:id',
  authJWT.isAdmin,
  validationId,
  validationUpdate,
  manageResponse,
  userCtrl.update
);
router.delete(
  '/:id',
  authJWT.isAdmin,
  validationId,
  manageResponse,
  userCtrl.remove
);

export default router;

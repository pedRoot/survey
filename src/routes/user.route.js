import { Router } from 'express';
import { authJWT } from '../middlewares';
import { manageResponse } from '../middlewares/takeResponseValidate';
import { rulesValidateEdit } from '../middlewares/validators/schemas/user/edit';

import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.get('/', authJWT.tokenVerification, manageResponse, userCtrl.show);
router.put('/', rulesValidateEdit, manageResponse, userCtrl.update);

export default router;

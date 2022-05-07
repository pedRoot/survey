import * as productCtrl from '../controllers/product.controller'
import {Router} from 'express'
import {authJWT} from "../middlewares"

const router = Router()

router.post('/', [authJWT.verifyToken, authJWT.isAdmin], productCtrl.add)
router.get('/:id', [authJWT.verifyToken], productCtrl.show)
router.get('/', [authJWT.verifyToken], productCtrl.list)
router.delete('/:id', [authJWT.verifyToken, authJWT.isAdmin], productCtrl.removeById)
router.put('/:id', [authJWT.verifyToken, authJWT.isAdmin], productCtrl.updateById)

export default router
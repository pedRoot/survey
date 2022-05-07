import * as drawCtrl from '../controllers/draw.controller'
import {Router} from 'express'
import {authJWT} from "../middlewares"

const router = Router()

router.post('/', [authJWT.verifyToken], drawCtrl.generate)
router.get('/', [authJWT.verifyToken], drawCtrl.list)
router.delete('/', [authJWT.verifyToken], drawCtrl.reset)

export default router
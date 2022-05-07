import * as authController from "../controllers/auth.controller";
import { Router } from "express";
import { authJWT } from "../middlewares";

const router = Router();

router.post(
  "/signup",
  [authJWT.verifyToken, authJWT.isAdmin],
  authController.signup
);
router.post("/signin", authController.signin);

export default router;

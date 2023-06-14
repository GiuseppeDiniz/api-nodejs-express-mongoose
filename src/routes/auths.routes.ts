import express, { type Router } from "express";
import AuthController from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshTokens);

export default router;

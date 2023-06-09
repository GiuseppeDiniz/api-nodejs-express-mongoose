import express, { type Router } from "express";
import AuthController from "../controllers/authController";

const router: Router = express.Router();

router.post("/login", AuthController.login);

export default router;

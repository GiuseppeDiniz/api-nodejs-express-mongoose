import express, { type Router } from "express";
import LoginController from "../controllers/loginController";

const router: Router = express.Router();

router.post("/login", LoginController.login);

export default router;

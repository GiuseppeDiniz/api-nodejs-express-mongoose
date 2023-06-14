import express, { type Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRotes: Router = express.Router();

authRotes
  .post("/login", AuthController.login)
  .post("/refresh-token", AuthController.refreshTokens);

export default authRotes;

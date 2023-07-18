import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import express, { type Router } from "express";
import SessionController from "../controllers/session.controller";

const roleRoutes: Router = express.Router();

roleRoutes.get("/session", ensuredAuthenticated, SessionController.create);

export default roleRoutes;

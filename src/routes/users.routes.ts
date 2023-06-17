import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import express, { type Router } from "express";
import UserController from "../controllers/user.controller";
import { can } from "../middleware/ensureAuthorized";

const userRoutes: Router = express.Router();

userRoutes
  .get("/users", ensureAuthenticated, can(["login"]), UserController.listUsers)
  .get("/users/:id", ensureAuthenticated, UserController.readUser)
  .post("/users", ensureAuthenticated, UserController.createUser)
  .put("/users/:id", ensureAuthenticated, UserController.updateUser)
  .delete("/users/:id", ensureAuthenticated, UserController.deleteUser);

export default userRoutes;

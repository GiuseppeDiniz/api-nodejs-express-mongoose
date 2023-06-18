import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import express, { type Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes: Router = express.Router();

userRoutes
  .get("/users", ensuredAuthenticated, UserController.listUsers)
  .get("/users/:id", ensuredAuthenticated, UserController.readUser)
  .post("/users", ensuredAuthenticated, UserController.createUser)
  .put("/users/:id", ensuredAuthenticated, UserController.updateUser)
  .delete("/users/:id", ensuredAuthenticated, UserController.deleteUser);

export default userRoutes;

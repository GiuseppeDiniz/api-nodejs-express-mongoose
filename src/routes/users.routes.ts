import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import express, { type Router } from "express";
import UserController from "../controllers/users.controller";

const router: Router = express.Router();

router
  .get("/users", ensureAuthenticated, UserController.listUsers)
  .get("/users/:id", ensureAuthenticated, UserController.readUser)
  .post("/users", ensureAuthenticated, UserController.createUser)
  .put("/users/:id", ensureAuthenticated, UserController.updateUser)
  .delete("/users/:id", ensureAuthenticated, UserController.deleteUser);

export default router;

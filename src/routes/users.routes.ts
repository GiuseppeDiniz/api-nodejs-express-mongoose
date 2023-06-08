import express, { type Router } from "express";
import UserController from "../controllers/usersControllers";

const router: Router = express.Router();

router
  .get("/users", UserController.listUsers)
  .get("/users/:id", UserController.readUser)
  .post("/users", UserController.createUser)
  .put("/users/:id", UserController.updateUser)
  .delete("/users/:id", UserController.deleteUser);

export default router;

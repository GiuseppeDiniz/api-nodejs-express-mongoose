import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import express, { type Router } from "express";
import RoleController from "../controllers/role.controller";

const roleRoutes: Router = express.Router();

roleRoutes
  .post("/roles", ensuredAuthenticated, RoleController.createRole)
  .get("/roles", ensuredAuthenticated, RoleController.readRoles)
  .get("/roles/:id", ensuredAuthenticated, RoleController.readRole)
  .put("/roles/:id", ensuredAuthenticated, RoleController.updateRole)
  .delete("/roles/:id", ensuredAuthenticated, RoleController.deleteRole);

export default roleRoutes;

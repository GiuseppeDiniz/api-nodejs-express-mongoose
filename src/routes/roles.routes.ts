import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import express, { type Router } from "express";
import RoleController from "../controllers/role.controller";

const roleRoutes: Router = express.Router();

roleRoutes
  .post("/roles", ensureAuthenticated, RoleController.createRole)
  .get("/roles", ensureAuthenticated, RoleController.readRoles)
  .get("/roles/:id", ensureAuthenticated, RoleController.readRole)
  .put("/roles/:id", ensureAuthenticated, RoleController.updateRole)
  .delete("/roles/:id", ensureAuthenticated, RoleController.deleteRole);

export default roleRoutes;

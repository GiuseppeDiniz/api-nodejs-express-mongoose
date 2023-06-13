import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import express, { type Router } from "express";
import RoleController from "../controllers/roleControllers";

const router: Router = express.Router();

router
  .get("/roles", ensureAuthenticated, RoleController.createRole)
  .post("/roles", ensureAuthenticated, RoleController.readRoles)
  .post("/roles/:id", ensureAuthenticated, RoleController.readRole)
  .put("/roles/:id", ensureAuthenticated, RoleController.updateRole)
  .delete("/roles/:id", ensureAuthenticated, RoleController.deleteRole);

export default router;

import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import express, { type Router } from "express";
import PermissionController from "../controllers/permission.controller";

const permissionRoutes: Router = express.Router();

permissionRoutes
  .post(
    "/permissions",
    ensureAuthenticated,
    PermissionController.createPermission
  )
  .get(
    "/permissions",
    ensureAuthenticated,
    PermissionController.readPermissions
  );

export default permissionRoutes;

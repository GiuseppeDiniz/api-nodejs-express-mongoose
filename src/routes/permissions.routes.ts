import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import express, { type Router } from "express";
import PermissionController from "../controllers/permission.controller";

const permissionRoutes: Router = express.Router();

permissionRoutes
  .post(
    "/permissions",
    ensuredAuthenticated,
    PermissionController.createPermission
  )
  .get(
    "/permissions",
    ensuredAuthenticated,
    PermissionController.readPermissions
  );

export default permissionRoutes;

import { Request, Response } from "express";
import PermissionService from "../services/permission.service";
import Permission, {
  IPermission,
  type PermissionModel,
} from "../models/Permission";

type PermissionRequest = {
  name: string;
  description: string;
};

class PermissionController {
  public static async createPermission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { name, description }: PermissionRequest = req.body;
      const roleAlreadyExist = await PermissionService.alreadyExist(name);

      if (roleAlreadyExist) {
        res.status(409).json({ message: "Permission already exists" });
      } else {
        const permission: IPermission = await Permission.create({
          name,
          description,
        });
        res.status(201).json(permission);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async readPermissions(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const permission: PermissionModel[] = await Permission.find();

      res.status(200).json(permission);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default PermissionController;

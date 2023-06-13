import { Request, Response } from "express";
import Role, { IRole } from "../models/Role";
import RoleService from "../services/roleServices";

type RoleRequest = {
  name: string;
  description: string;
};

class RoleController {
  public static async createRole(req: Request, res: Response): Promise<void> {
    try {
      const { name, description }: RoleRequest = req.body;
      const roleAlreadyExist = await RoleService.alreadyExist(name);

      if (roleAlreadyExist) {
        res.status(409).json({ message: "Role already exists" });
      } else {
        const role: IRole = await Role.create({ name, description });
        res.status(201).json(role);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  public static async readRole(req: Request, res: Response): Promise<void> {
    try {
      const roles: IRole[] = await Role.find();

      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  public static async readRoles(req: Request, res: Response): Promise<void> {
    try {
      const roleId: string = req.params.id;
      const role: IRole | null = await Role.findById(roleId);

      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: "Role not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  public static async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const roleId: string = req.params.id;
      const { name, description }: RoleRequest = req.body;
      const roleAlreadyExist = await RoleService.alreadyExist(name);

      if (roleAlreadyExist) {
        res.status(409).json({ message: "Role already exists" });
      } else {
        const updatedRole: IRole | null = await Role.findByIdAndUpdate(
          roleId,
          { name, description },
          { new: true }
        );

        if (updatedRole) {
          res.status(200).json(updatedRole);
        } else {
          res.status(404).json({ message: "Role not found" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  public static async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const roleId: string = req.params.id;
      const deletedRole: IRole | null = await Role.findByIdAndDelete(roleId);

      if (deletedRole) {
        res.status(200).json({ message: "Role deleted successfully" });
      } else {
        res.status(404).json({ message: "Role not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default RoleController;

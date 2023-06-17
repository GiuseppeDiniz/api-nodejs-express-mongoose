import { Request, Response } from "express";
import Permission from "src/models/Permission";
import Role from "src/models/Role";
import User from "src/models/User";

type AcessRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

export default class AcessControll {
  public static userAcesses = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { roles, permissions }: AcessRequest = req.body;
      const userId = req.params.id;

      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const newRole = await Role.findById(roles);
      if (!newRole) {
        res.status(404).json({ error: "One or more roles not found" });
        return;
      }

      const newPermission = await Permission.findById(permissions);
      if (!newPermission) {
        res.status(404).json({ error: "One or more permissions not found" });
        return;
      }

      await User.updateOne(
        { _id: user._id },
        { roles: newRole },
        { permissions: newPermission }
      );

      res
        .status(200)
        .json({ message: "Roles and permissions added to user successfully" });
    } catch (error: unknown) {
      console.error("Error adding roles and permissions to user:", error);
      res.status(500).json({
        message: "Failed to add roles and permissions to user",
        error,
      });
    }
  };
}

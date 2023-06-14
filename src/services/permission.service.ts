import Permission, { PermissionModel } from "../models/Permission";

class PermissionService {
  public static async alreadyExist(name: string): Promise<boolean> {
    const existingPermission: PermissionModel | null = await Permission.findOne(
      {
        name,
      }
    );
    return !!existingPermission;
  }
}

export default PermissionService;

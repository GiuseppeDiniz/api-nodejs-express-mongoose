import Role, { IRole } from "../models/Role";

class RoleService {
  public static async alreadyExist(name: string): Promise<boolean> {
    const existingRole: IRole | null = await Role.findOne({ name });
    return !!existingRole;
  }
}

export default RoleService;

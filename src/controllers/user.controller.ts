import { hash } from "bcryptjs";
import { type Request, type Response } from "express";
import Role from "../models/Role";
import User, { IUser } from "../models/User";

class UserController {
  public static listUsers = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const users: IUser[] = await User.find();
      res.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
          message: "An error occurred while fetching users.",
          error: error.message,
        });
      } else {
        console.error("Unknown error:", error);
        res.status(500).json({
          message: "An unknown error occurred while fetching users.",
        });
      }
    }
  };

  public static readUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  };

  public static createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { login, password, email } = req.body;

      const existingUser: IUser | null | undefined = await User.findOne({
        login,
      });
      if (existingUser) {
        return res.status(400).json({ message: "Login already exists" });
      }

      const existingEmailUser: IUser | null | undefined = await User.findOne({
        email,
      });
      if (existingEmailUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const passwordHash = await hash(password, 8);

      const now = new Date();
      const user: IUser = new User({
        login,
        password: passwordHash,
        email,
        createdAt: now,
        updatedAt: now,
      });

      await user.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Failed to create user", error });
    }
  };

  public static updateUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      const userData = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user", error });
    }
  };

  public static deleteUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.params.id;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: unknown) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user", error });
    }
  };

  public static addRoleToUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { roles } = req.body;
    const { userId } = req;

    try {
      const user = await User.findById(userId);
      const role = await Role.findById(roles);

      if (!user || !role) {
        res.status(404).json({ error: "User or role not found" });
        return;
      }

      user.roles.push(role._id); // Assuming the roles are stored as an array of role IDs in the 'roles' field of the user model
      await user.save();

      res.status(200).json({ message: "Role added to user successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default UserController;

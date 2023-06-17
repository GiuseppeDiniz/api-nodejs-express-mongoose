import { Request, Response } from "express";
import UserService, { type UserRequest } from "../services/user.service";

class UserController {
  public static listUsers = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const users = await UserService.listUsers();
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
      const user = await UserService.readUser(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public static createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { login, password, email }: UserRequest = req.body;

      const existingUser = await UserService.findUserByLogin(login);
      if (existingUser) {
        return res.status(400).json({ message: "Login already exists" });
      }

      const existingEmailUser = await UserService.findUserByEmail(email);
      if (existingEmailUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user: UserRequest = {
        login,
        password,
        email,
      };

      const createdUser = await UserService.createUser(user);

      return res
        .status(201)
        .json({ message: "User created successfully", user: createdUser });
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
      const userData: UserRequest = req.body;

      const updatedUser = await UserService.updateUser(userId, userData);

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

      const deletedUser = await UserService.deleteUser(userId);

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
}

export default UserController;

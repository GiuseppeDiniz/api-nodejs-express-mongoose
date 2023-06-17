import { hash } from "bcryptjs";
import User, { IUser } from "../models/User";

export type UserRequest = {
  login: string;
  password: string;
  email: string;
};

class UserService {
  public static async listUsers(): Promise<IUser[]> {
    return User.find();
  }

  public static async readUser(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }

  public static async findUserByLogin(login: string): Promise<IUser | null> {
    return User.findOne({ login });
  }

  public static async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  public static async createUser(userDto: UserRequest): Promise<IUser> {
    const { login, password, email } = userDto;

    const passwordHash = await hash(password, 8);

    const now = new Date();
    const user: IUser = new User({
      login,
      password: passwordHash,
      email,
      createdAt: now,
      updatedAt: now,
    });

    return user.save();
  }

  public static async updateUser(
    userId: string,
    userData: UserRequest
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, userData, { new: true });
  }

  public static async deleteUser(userId: string): Promise<IUser | null> {
    return User.findByIdAndDelete(userId);
  }
}

export default UserService;

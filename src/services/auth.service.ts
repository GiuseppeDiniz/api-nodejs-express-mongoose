import User, { IUser } from "../models/User";
import { compare } from "bcryptjs";
import { decode, sign, verify } from "jsonwebtoken";
require("dotenv/config");

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;
const ACCESSTOKEN_EXPIRATION = "60s";
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET;
const REFRESHTOKEN_EXPIRATION = "7d";

class AuthService {
  public static async validateUser(
    login: string,
    password: string
  ): Promise<IUser> {
    const user = await User.findOne({ login });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async generateAccessToken(userId: any) {
    return sign({}, `${ACCESSTOKEN_SECRET}`, {
      subject: userId,
      expiresIn: ACCESSTOKEN_EXPIRATION,
    });
  }

  public static async validateAccessToken(accessToken: string) {
    return verify(accessToken, `${ACCESSTOKEN_SECRET}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async generateRefreshToken(userId: any) {
    return sign({}, `${REFRESHTOKEN_SECRET}`, {
      subject: userId,
      expiresIn: REFRESHTOKEN_EXPIRATION,
    });
  }
  public static async validateRefreshToken(refreshToken: string) {
    return verify(refreshToken, `${REFRESHTOKEN_SECRET}`);
  }
  public static decodeToken(token: string) {
    return decode(token);
  }
}

export default AuthService;

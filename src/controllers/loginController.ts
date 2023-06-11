import User from "../models/User";
import { Request, Response } from "express";
import AuthService from "../services/authService";

class LoginController {
  public static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { login, password } = req.body;
      const user = await AuthService.validateUser(login, password);
      const access_token = await AuthService.generateAccessToken(user.id);
      const refresh_token = await AuthService.generateRefreshToken(user.id);

      await User.updateOne({ _id: user.id }, { refreshToken: refresh_token });

      res.status(200).json({
        data: {
          access_token,
          refresh_token,
        },
      });
    } catch (error: unknown) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default LoginController;

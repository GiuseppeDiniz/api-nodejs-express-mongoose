import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import AuthService from "../services/auth.service";
import User from "../models/User";

class AuthController {
  public static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });

      if (!user) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      const accessToken = await AuthService.generateAccessToken(user.id);
      const refreshToken = await AuthService.generateRefreshToken(user.id);

      await User.updateOne({ _id: user._id }, { refreshToken });

      res.status(200).json({
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public static refreshTokens = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { refresh_token } = req.body;
    try {
      const { sub } = await AuthService.validateRefreshToken(refresh_token);
      const user = await User.findOne({
        _id: sub,
        refreshToken: refresh_token,
      });

      if (!user?._id) {
        res.status(401).json({
          error: {
            status: 401,
            message: "Invalid refresh token, please login again.",
          },
        });
        return;
      }

      const tokens = {
        access_token: await AuthService.generateAccessToken(sub),
        refresh_token: await AuthService.generateRefreshToken(sub),
      };

      await User.updateOne(
        { _id: user._id },
        { refreshToken: tokens.refresh_token }
      );

      res.status(200).json({
        data: tokens,
      });
    } catch (error) {
      res.status(401).json({
        error: {
          status: 401,
          message: "Invalid refresh token, please login again.",
        },
      });
    }
  };
}

export default AuthController;

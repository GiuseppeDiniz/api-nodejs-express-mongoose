import AuthService from "../services/authService";
import { Request, Response } from "express";
import User from "../models/User";

export class RefreshController {
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

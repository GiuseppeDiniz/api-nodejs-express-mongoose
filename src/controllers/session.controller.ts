import { Request, Response } from "express";
import { getTokenFromHeaders } from "../util/getTokenFromHeaders";
import User from "../models/User";
import AuthService from "../services/auth.service";

class SessionController {
  public static async create(req: Request, res: Response) {
    const token = getTokenFromHeaders(req);

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      const decodedToken = await AuthService.validateAccessToken(token);

      const user = await User.findById(decodedToken.sub);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const responseData = {
        user: {
          login: user.login,
          email: user.email,
        },
        id: decodedToken.sub,
      };

      return res.json({ data: responseData });
    } catch (error) {
      return res.status(401).json({ error: "Token inválido" });
    }
  }
}

export default SessionController;

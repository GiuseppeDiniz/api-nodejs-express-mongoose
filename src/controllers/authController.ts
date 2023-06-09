import User from "../models/User";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
require("dotenv/config");

class AuthController {
  public static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { login, password } = req.body;

      const user = await User.findOne({ login });
      if (!user) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      const token = sign({}, `${process.env.MY_256_BIT_SECRET}`, {
        subject: user.id,
        expiresIn: "36000s",
      });

      res.json({ token });
    } catch (error: unknown) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
}

export default AuthController;

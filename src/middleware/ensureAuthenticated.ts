import { getTokenFromHeaders } from "../util/getTokenFromHeaders";
import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = getTokenFromHeaders(req);

  if (!token) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  AuthService.validateAccessToken(token)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(401).json({ error: "Token inválido" });
    });
};

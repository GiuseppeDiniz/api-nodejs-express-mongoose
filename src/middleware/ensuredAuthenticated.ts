import { getTokenFromHeaders } from "../util/getTokenFromHeaders";
import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import { decode } from "jsonwebtoken";

export const ensuredAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = getTokenFromHeaders(req);

  if (!token) {
    res.status(401).json({ error: "Authentication token not provided." });
    return;
  }

  AuthService.validateAccessToken(token)
    .then(() => {
      const result = decode(token);
      req.userId = result?.sub;
      next();
    })
    .catch(() => {
      res.status(401).json({
        message:
          "Your access token is not valid, so you are not able to get a session.",
      });
    });
};

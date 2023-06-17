import { getTokenFromHeaders } from "../util/getTokenFromHeaders";
import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";

export const ensureAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(request);

    if (!token) {
      response.status(401).json({ error: "Token não fornecido" });
      return;
    }

    try {
      verify(token, `${process.env.ACCESSTOKEN_SECRET}`);

      request.userId = "testing";

      return next();
    } catch (err) {
      return response.status(401).end();
    }
  };
};

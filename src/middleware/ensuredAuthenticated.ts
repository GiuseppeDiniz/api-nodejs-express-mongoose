import { getTokenFromHeaders } from "../util/getTokenFromHeaders";
import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;

export const ensuredAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(request);

    if (!token) {
      return response
        .status(401)
        .json({ error: "Authentication token not provided." });
    }

    try {
      verify(token, ACCESSTOKEN_SECRET);
      const { sub } = decode(token);
      request.userId = sub.toString();

      return next();
    } catch (err) {
      return response.status(401).json({
        message:
          "Your access token is not valid, so you are not able to get a session.",
      });
    }
  };
};

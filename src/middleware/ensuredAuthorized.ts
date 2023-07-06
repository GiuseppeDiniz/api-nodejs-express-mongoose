import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId: _id } = request;

    try {
      const user = await User.findOne({ _id }).populate("roles");

      if (!user) {
        response.status(400).json("User does not exist");
        return;
      }

      const hasAccess = rolesRoutes.every((roleRoute) => {
        return user.roles.includes(roleRoute);
      });

      if (hasAccess) {
        // User has access, call the `next` function to proceed
        next();
      } else {
        // User does not have access, send an error response
        response.status(403).json({ error: "Access denied" });
      }
    } catch (error) {
      response.status(500).json({ error: "Internal Server Error" });
    }
  };
}
